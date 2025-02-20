import React, { useState } from "react";
import "./FoodSelection.css";
import axios from "axios";
import BackgroundParticles from "../../../BackgroundParticles";
import FoodDetailsModal from "./FoodDetailsModal";
import AddedFoodsModal from "./AddedFoodsModal";

const USDA_API_KEY = process.env.REACT_APP_USDA_API_KEY;

const FoodSelection = ({ meal, onClose }) => {
    const [activeTab, setActiveTab] = useState("Frequent");
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addedFoods, setAddedFoods] = useState([]);
    const [showAddedModal, setShowAddedModal] = useState(false);

    // 🔥 Основная функция поиска с обеих БД
    const searchFood = async () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        try {
            const [openFoodFactsRes, usdaRes] = await Promise.all([
                axios.get(`https://world.openfoodfacts.org/cgi/search.pl`, {
                    params: {
                        search_terms: searchQuery,
                        search_simple: 1,
                        action: "process",
                        json: 1,
                    },
                }),
                axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
                    params: {
                        query: searchQuery,
                        api_key: USDA_API_KEY,
                    },
                }),
            ]);

            const openFoodFactsResults = (openFoodFactsRes.data.products || [])
                .filter((product) => product.nutriments?.["energy-kcal_100g"])
                .map((product) => ({
                    name: product.product_name,
                    brand: product.brands,
                    quantity: product.product_quantity,
                    kcalPer100g: product.nutriments["energy-kcal_100g"],
                    source: "OpenFoodFacts",
                }));

            const usdaResults = (usdaRes.data.foods || [])
                .filter((food) => food.foodNutrients?.some((n) => n.nutrientName === "Energy"))
                .map((food) => ({
                    name: food.description,
                    brand: food.brandOwner,
                    quantity: food.servingSize,
                    kcalPer100g: food.foodNutrients.find((n) => n.nutrientName === "Energy")?.value,
                    source: "USDA",
                }));

            const combinedResults = [...openFoodFactsResults, ...usdaResults].sort((a, b) =>
                compareProducts(a, b, searchQuery)
            );

            setResults(combinedResults);
        } catch (error) {
            console.error("Ошибка при запросе:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🎯 Сортировка по совпадению
    const compareProducts = (a, b, query) => {
        const normalize = (str) => str?.toLowerCase() ?? "";
        const q = normalize(query);
        const rank = (name) => {
            if (name === q) return 0;
            if (name.startsWith(q)) return 1;
            if (name.includes(q)) return 2;
            return 3;
        };
        return rank(normalize(a.name)) - rank(normalize(b.name));
    };

    const handleAddFood = (product, quantity, unit) => {
    const newFood = {
        id: product.id || product._id || Date.now(), // 🔄 Уникальный ID
        product_name: product.product_name || product.name || "Unknown Product", // ✅ Название продукта
        quantity: quantity,
        unit: unit,
        calories: product.nutriments?.["energy-kcal_100g"] || 0, // ✅ Калории
        carbs: product.nutriments?.["carbohydrates_100g"] || 0,  // 🍞 Углеводы
        fat: product.nutriments?.["fat_100g"] || 0,              // 🧈 Жиры
        protein: product.nutriments?.["proteins_100g"] || 0,     // 🍗 Белки
    };

    console.log("Добавлено в список:", newFood); // ✅ Проверим структуру данных
    setAddedFoods([...addedFoods, newFood]);
    setSelectedProduct(null);
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
                    <button className="food-options-btn">⋮</button>
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

                <div className="food-list">
                    {loading ? (
                        <p className="placeholder-text">Loading...</p>
                    ) : results.length === 0 ? (
                        <p className="placeholder-text">No items found</p>
                    ) : (
                        results.map((product, index) => (
                            <div key={index} className="search-result-item" onClick={() => setSelectedProduct(product)}>
                                <div className="result-info">
                                    <h4 className="result-name">{product.name}</h4>
                                    <p className="result-brand">{product.brand || "Unknown brand"}</p>
                                    <span className="result-tag">{product.source}</span>
                                </div>
                                <div className="result-actions">
                                    <span className="result-kcal">
                                        {product.kcalPer100g ? `${product.kcalPer100g} kcal/100g` : "N/A"}
                                    </span>
                                    <button className="add-btn">+</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <button className="done-btn" onClick={onClose}>Done</button>

                {selectedProduct && (
                    <FoodDetailsModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onAdd={handleAddFood}
                    />
                )}

                {showAddedModal && (
                    <AddedFoodsModal
                        foods={addedFoods}
                        onClose={() => setShowAddedModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default FoodSelection;