import React from "react";
import "./FoodSelection.css";

const FoodSelection = ({ onClose }) => {
    return (
        <div className="food-selection-overlay">
            <div className="food-selection-container">
                {/* Заголовок */}
                <div className="header">
                    <h2>Breakfast</h2>
                </div>

                {/* Поле поиска */}
                <div className="search-bar">
                    <input type="text" placeholder="What are you looking for?" />
                </div>

                {/* Категории еды */}
                <div className="categories">
                    <button>🥕 Foods</button>
                    <button>🍱 Meals</button>
                    <button>👨‍🍳 Recipes</button>
                </div>

                {/* Табы */}
                <div className="tabs">
                    <button className="active">Frequent</button>
                    <button>Recent</button>
                    <button>Favorites</button>
                </div>

                {/* Список еды */}
                <div className="food-list">
                    <div className="food-item">
                        <span>Banana</span>
                        <span>134 kcal</span>
                        <button>+</button>
                    </div>
                    <div className="food-item">
                        <span>Coffee</span>
                        <span>2 kcal</span>
                        <button>+</button>
                    </div>
                    <div className="food-item">
                        <span>Egg, boiled</span>
                        <span>93 kcal</span>
                        <button>+</button>
                    </div>
                </div>

                {/* Кнопка "Done" */}
                <button className="done-btn" onClick={onClose}>Done</button>
            </div>
        </div>
    );
};

export default FoodSelection;