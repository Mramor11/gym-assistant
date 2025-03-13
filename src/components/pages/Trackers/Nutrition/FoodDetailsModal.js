import React, { useState } from "react";
import "./FoodDetailsModal.css";

const FoodDetailsModal = ({ product, onClose, onAdd }) => {
    const [quantity, setQuantity] = useState(100);
    const [unit, setUnit] = useState("g");

    return (
        <div className="food-details-overlay">
            <div className="food-details-modal">
                <div className="details-header">
                    <button className="back-btn" onClick={onClose}>←</button>
                    <h2 className="details-meal-title">{product.product_name}</h2>
                    <button className="favorite-btn">★</button>
                </div>

                <div className="nutrition-summary">
                    <div><span>{product.calories} kcal</span><p>Calories</p></div>
                    <div><span>{product.carbs} g</span><p>Carbs</p></div>
                    <div><span>{product.protein} g</span><p>Protein</p></div>
                    <div><span>{product.fat} g</span><p>Fat</p></div>
                </div>

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

                <button className="add-food-btn" onClick={() => onAdd(product, quantity, unit)}>Add</button>
            </div>
        </div>
    );
};

export default FoodDetailsModal;