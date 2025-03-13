import React, { useState } from "react";
import "./CustomFoodModal.css";

const CustomFoodModal = ({ onClose, onSave }) => {
    const [foodName, setFoodName] = useState("");
    const [calories, setCalories] = useState("");
    const [carbs, setCarbs] = useState("");
    const [protein, setProtein] = useState("");
    const [fat, setFat] = useState("");
    const [unit, setUnit] = useState("g");
    const unitOptions = {
        g: 100,
        piece: 1,
        ml: 100,
    };

    const handleSave = () => {
        if (!foodName.trim() || !calories.trim()) return;

        const newFood = {
            id: Date.now(),
            product_name: foodName,
            quantity: unitOptions[unit],
            unit,
            calories: Number(calories) || 0,
            carbs: Number(carbs) || 0,
            protein: Number(protein) || 0,
            fat: Number(fat) || 0,
        };

        onSave(newFood);
        onClose();
    };

    return (
        <div className="custom-food-overlay">
            <div className="custom-food-modal">
                <div className="custom-header">
                    <button className="back-btn" onClick={onClose}>←</button>
                    <h2 className="modal-title">Custom Entry</h2>
                </div>

                <div className="custom-food-icon">
                    <img src={`${process.env.PUBLIC_URL}/icons/custom-food.svg`} alt="Custom Food" />
                </div>

                {/* 🔥 Блок выбора единицы измерения */}
                <div className="value-per-container">
                    <span className="value-per-label">Values Per</span>
                    <div className="value-per-select">
                        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                            <option value="g">100 g</option>
                            <option value="piece">1 Piece</option>
                            <option value="ml">100 ml</option>
                        </select>
                    </div>
                </div>

                <div className="custom-inputs">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                    />

                    <label>Calories (kcal)</label>
                    <input
                        type="number"
                        placeholder="Enter calories"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                    />

                    <label>Carbs (g) (optional)</label>
                    <input
                        type="number"
                        placeholder="Enter carbs"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                    />

                    <label>Protein (g) (optional)</label>
                    <input
                        type="number"
                        placeholder="Enter protein"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                    />

                    <label>Fat (g) (optional)</label>
                    <input
                        type="number"
                        placeholder="Enter fat"
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                    />
                </div>

                <button
                    className={`custom-save-btn ${foodName.trim() && calories.trim() ? "" : "disabled"}`}
                    onClick={handleSave}
                    disabled={!foodName.trim() || !calories.trim()}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default CustomFoodModal;