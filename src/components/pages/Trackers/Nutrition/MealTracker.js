import React, { useState } from "react";
import "./MealTracker.css";
import FoodSelection from "./FoodSelection"; // Импортируем модальное окно

const meals = [
    { name: "Breakfast", calories: 922, icon: "☕️" },
    { name: "Lunch", calories: 1229, icon: "🍲" },
    { name: "Dinner", calories: 768, icon: "🥗" },
    { name: "Snacks", calories: 154, icon: "🍎" },
];

const MealTracker = () => {
    const [selectedMeal, setSelectedMeal] = useState(null);

    // Функция открытия модального окна
    const openFoodSelection = (meal) => {
        setSelectedMeal(meal);
    };

    // Функция закрытия модального окна
    const closeFoodSelection = () => {
        setSelectedMeal(null);
    };

    return (
        <div className="meal-tracker">
            <div className="meal-list">
                {meals.map((meal, index) => (
                    <div key={index} className="meal-item">
                        <div className="meal-icon">{meal.icon}</div>
                        <div className="meal-info">
                            <h4>{meal.name}</h4>
                            <p>0 / {meal.calories} kcal</p>
                        </div>
                        <button
                            className="meal-add"
                            onClick={() => openFoodSelection(meal.name)}
                        >
                            <img src={`${process.env.PUBLIC_URL}/icons/plus.svg`} alt="Add Meal"/>
                        </button>
                    </div>
                ))}
            </div>

            {/* Модальное окно FoodSelection */}
            {selectedMeal && <FoodSelection meal={selectedMeal} onClose={closeFoodSelection} />}
        </div>
    );
};

export default MealTracker;