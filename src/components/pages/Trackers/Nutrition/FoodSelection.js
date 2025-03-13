import React, { useState, useEffect } from "react";
import "./FoodSelection.css";
import axios from "axios";
import BackgroundParticles from "../../../BackgroundParticles";
import FoodDetailsModal from "./FoodDetailsModal";
import AddedFoodsModal from "./AddedFoodsModal";
import CustomFoodModal from "./CustomFoodModal";

const FoodSelection = ({ meal, onClose, onAddFood }) => {
    const [activeTab, setActiveTab] = useState("Frequent");
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addedFoods, setAddedFoods] = useState([]);
    const [customFoods, setCustomFoods] = useState([]);
    const [showAddedModal, setShowAddedModal] = useState(false);
    const [showCustomFoodModal, setShowCustomFoodModal] = useState(false);
    
    const handleSaveCustomFood = (newFood) => {
        console.log("Saving custom food:", newFood);
        const updatedCustomFoods = [...customFoods, newFood];
        setCustomFoods(updatedCustomFoods);
    
        // ✅ Сохраняем в localStorage
        localStorage.setItem("customFoods", JSON.stringify(updatedCustomFoods));
    
        // ✅ Добавляем калории в MealTracker
        onAddFood(meal, Math.round(newFood.calories * (newFood.quantity / 100)));
    
        setShowCustomFoodModal(false);
    };

    const USDA_API_KEY = process.env.REACT_APP_USDA_API_KEY;

    useEffect(() => {
        const savedFoods = JSON.parse(localStorage.getItem(`addedFoods_${meal}`)) || [];
        setAddedFoods(savedFoods);

        const savedCustomFoods = JSON.parse(localStorage.getItem("customFoods")) || [];
        setCustomFoods(savedCustomFoods);
    }, [meal]);

    useEffect(() => {
        const savedCustomFoods = JSON.parse(localStorage.getItem("customFoods")) || [];
        console.log("Загруженные customFoods из localStorage:", savedCustomFoods);
        setCustomFoods(savedCustomFoods);
    }, []);

    useEffect(() => {
        localStorage.setItem(`addedFoods_${meal}`, JSON.stringify(addedFoods));
    }, [addedFoods]);

    useEffect(() => {
        localStorage.setItem("customFoods", JSON.stringify(customFoods));
    }, [customFoods]);

    const searchFood = async () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setResults([]);
        try {
            const openFoodFactsResponse = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl`, {
                params: {
                    search_terms: searchQuery,
                    search_simple: 1,
                    action: "process",
                    json: 1,
                },
            });

            const usdaResponse = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
                params: {
                    query: searchQuery,
                    api_key: USDA_API_KEY,
                },
            });

            const openFoodResults = (openFoodFactsResponse.data.products || [])
                .map(product => ({
                    id: product.id || Date.now(),
                    product_name: product.product_name || "Unnamed product",
                    quantity: 100,
                    unit: "g",
                    calories: product.nutriments?.["energy-kcal_100g"] || 0,
                    protein: product.nutriments?.["proteins_100g"] || 0,
                    fat: product.nutriments?.["fat_100g"] || 0,
                    carbs: product.nutriments?.["carbohydrates_100g"] || 0,
                }))
                .filter(product => product.calories > 0);

            const usdaResults = (usdaResponse.data.foods || [])
                .map(food => ({
                    id: food.fdcId,
                    product_name: food.description,
                    quantity: 100,
                    unit: "g",
                    calories: food.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0,
                    protein: food.foodNutrients.find(n => n.nutrientName === "Protein")?.value || 0,
                    fat: food.foodNutrients.find(n => n.nutrientName === "Total lipid (fat)")?.value || 0,
                    carbs: food.foodNutrients.find(n => n.nutrientName === "Carbohydrate, by difference")?.value || 0,
                }))
                .filter(food => food.calories > 0);

            const combinedResults = [...openFoodResults, ...usdaResults].sort((a, b) =>
                compareProducts(a, b, searchQuery)
            );

            setResults(combinedResults);
        } catch (error) {
            console.error("Ошибка при запросе к базе данных:", error);
        } finally {
            setLoading(false);
        }
    };

    const compareProducts = (a, b, query) => {
        const normalize = (str) => str?.toLowerCase() ?? "";
        const aName = normalize(a.product_name);
        const bName = normalize(b.product_name);
        const q = normalize(query);

        const rank = (name) => {
            if (name === q) return 0;
            if (name.startsWith(q)) return 1;
            if (name.includes(q)) return 2;
            return 3;
        };
        return rank(aName) - rank(bName);
    };

    return (
        <div className="food-selection-overlay">
            <BackgroundParticles />
            <div className="food-selection-modal">
                <div className="food-header">
                    <button className="food-counter" onClick={() => setShowAddedModal(true)}>
                        {addedFoods.length}
                    </button>
                    <h2 className="meal-title">{meal}</h2>
                    <button className="food-options-btn" onClick={() => setShowCustomFoodModal(true)}>⋮</button>
                </div>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchFood()}
                    />
                    <button className="food-scan-btn" onClick={searchFood}>
                        <img src={`${process.env.PUBLIC_URL}/icons/search.svg`} alt="Search" />
                    </button>
                </div>

                <div className="food-tabs">
                    {["Frequent", "Custom"].map((tab) => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="food-list">
                {loading ? (
                    <p className="placeholder-text">Loading...</p>
                ) : activeTab === "Custom" ? (
                    customFoods.length === 0 ? (
                        <p className="placeholder-text">No custom foods added</p>
                    ) : (
                        customFoods.map((product, index) => (
                            <div key={index} className="search-result-item" onClick={() => setSelectedProduct(product)}>
                                <div className="result-info">
                                    <h4 className="result-name">{product.product_name}</h4>
                                    <p className="result-brand">{product.quantity} {product.unit}</p>
                                    <span className="result-tag">Custom</span>
                                </div>
                                <div className="result-actions">
                                    <span className="result-kcal">{product.calories} kcal</span>
                                    <button className="add-btn" onClick={(e) => {
                                        e.stopPropagation();
                                        onAddFood(meal, Math.round((product.calories * product.quantity) / 100));
                                    }}>+</button>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <p className="placeholder-text">No frequent foods available</p> // или другой JSX-код
                )}
                </div>

                <button className="done-btn" onClick={onClose}>Done</button>

                {selectedProduct && (
                    <FoodDetailsModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onAdd={(product, quantity, unit) => {
                            const newFood = {
                                id: product.id || Date.now(),
                                product_name: product.product_name,
                                quantity: Number(quantity),
                                unit,
                                calories: product.calories || 0,
                                protein: product.protein || 0,
                                fat: product.fat || 0,
                                carbs: product.carbs || 0,
                            };

                            setAddedFoods((prevFoods) => [...prevFoods, newFood]);

                            // ✅ Обновляем калории в `MealTracker`
                            onAddFood(meal, Math.round((product.calories * Number(quantity)) / 100));

                            setSelectedProduct(null);
                        }}
                    />
                )}

                {showAddedModal && (
                    <AddedFoodsModal
                        foods={addedFoods}
                        onClose={() => setShowAddedModal(false)}
                    />
                )}

                {showCustomFoodModal && (
                    <CustomFoodModal
                        onSave={handleSaveCustomFood}
                        onClose={() => setShowCustomFoodModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default FoodSelection;