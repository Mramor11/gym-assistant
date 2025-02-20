import React, { useState } from "react";
import "./FoodDetailsModal.css";

const FoodDetailsModal = ({ product, onClose, onAdd }) => {
    const [quantity, setQuantity] = useState(100);
    const [unit, setUnit] = useState("g");

    const calories = product?.nutriments?.["energy-kcal_100g"] ?? 0;
    const carbs = product?.nutriments?.["carbohydrates_100g"] ?? 0;
    const protein = product?.nutriments?.["proteins_100g"] ?? 0;
    const fat = product?.nutriments?.["fat_100g"] ?? 0;

    return (
        <div className="food-details-overlay">
            <div className="food-details-modal">
                {/* 🔵 Заголовок */}
                <div className="details-header">
                    <button className="back-btn" onClick={onClose}>←</button>
                    <h2 className="details-meal-title">{product?.product_name ?? "Unknown Product"}</h2>
                    <button className="favorite-btn">★</button>
                </div>

                {/* 🟡 КБЖУ */}
                <div className="nutrition-summary">
                    <div><span>{calories} kcal</span><p>Calories</p></div>
                    <div><span>{carbs} g</span><p>Carbs</p></div>
                    <div><span>{protein} g</span><p>Protein</p></div>
                    <div><span>{fat} g</span><p>Fat</p></div>
                </div>

                {/* ⚪ Блок выбора количества */}
                <div className="quantity-selector">
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="quantity-input"
                    />
                    <select value={unit} onChange={(e) => setUnit(e.target.value)} className="unit-select">
                        <option value="g">Gram</option>
                        <option value="piece">Piece</option>
                        <option value="ml">Milliliter</option>
                    </select>
                </div>

                {/* 🔴 Кнопка добавления */}
                <button className="add-food-btn" onClick={() => onAdd(product, quantity, unit)}>Add</button>
            </div>
        </div>
    );
};

export default FoodDetailsModal;