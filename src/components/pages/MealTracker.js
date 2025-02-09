import React from "react";
import "./MealTracker.css"; // Подключаем стили

const meals = [
    { name: "Breakfast", calories: 922, icon: "🍵" },
    { name: "Lunch", calories: 1229, icon: "🥗" },
    { name: "Dinner", calories: 768, icon: "🥗" },
    { name: "Snacks", calories: 154, icon: "🍎" },
];

const MealTracker = () => {
    return (
        <div className="meal-tracker">
            <div className="meal-header">
                <h3>Nutrition</h3>
                <span className="more">More</span>
            </div>
            <div className="meal-list">
                {meals.map((meal, index) => (
                    <div key={index} className="meal-item">
                        <div className="meal-icon">{meal.icon}</div>
                        <div className="meal-info">
                            <h4>{meal.name}</h4>
                            <p>0 / {meal.calories} kcal</p>
                        </div>
                        <button className="meal-add">+</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MealTracker;