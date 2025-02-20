import React from "react";
import "./AddedFoodsModal.css";

const AddedFoodsModal = ({ foods, onClose, onDelete, onEdit }) => {
    return (
        <div className="added-foods-overlay">
            <div className="added-foods-modal">
                <div className="header">
                    <h3>Just Added</h3>
                    <button className="close-btn" onClick={onClose}>Close</button>
                </div>

                <ul className="foods-list">
                    {foods.map((food, index) => (
                        <li key={index} className="food-item" onClick={() => onEdit(food, index)}>
                            <div>
                                <p>{food.product_name || "Unknown Product"}</p> {/* ✅ Отображаем название */}
                                <span>{food.quantity} {food.unit}</span>
                            </div>
                            <div className="actions">
                <span>
                    {/* ✅ Перерасчет калорий */}
                    {(food.calories * (food.quantity / 100)).toFixed(2)} kcal
                </span>
                                <button className="delete-btn" onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(index);
                                }}>✖
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddedFoodsModal;