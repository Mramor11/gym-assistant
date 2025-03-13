import React, { useState } from "react";
import "./MealTracker.css";
import { nutritionGoals } from "../../../../constants/nutritionGoals";
import FoodSelection from "./FoodSelection";

const meals = [
    { name: "Breakfast", icon: "☕️" },
    { name: "Lunch", icon: "🍲" },
    { name: "Dinner", icon: "🥗" },
    { name: "Snacks", icon: "🍎" },
];

const MealTracker = () => {
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [mealData, setMealData] = useState({
        Breakfast: 0,
        Lunch: 0,
        Dinner: 0,
        Snacks: 0,
    });

    const handleAddFood = (meal, calories) => {
        setMealData((prev) => ({
            ...prev,
            [meal]: prev[meal] + calories,
        }));
    };

    return (
        <div className="meal-tracker">
            <div className="meal-list">
                {meals.map((meal, index) => (
                    <div key={index} className="meal-item">
                        <div className="meal-icon">{meal.icon}</div>
                        <div className="meal-info">
                            <h4>{meal.name}</h4>
                            <p>{mealData[meal.name]} / {nutritionGoals[meal.name]} kcal</p>
                        </div>
                        <button
                            className="meal-add"
                            onClick={() => setSelectedMeal(meal.name)}
                        >
                            <img src={`${process.env.PUBLIC_URL}/icons/plus.svg`} alt="Add Meal" />
                        </button>
                    </div>
                ))}
            </div>

            {selectedMeal && (
                <FoodSelection
                    meal={selectedMeal}
                    onClose={() => setSelectedMeal(null)}
                    onAddFood={handleAddFood} // ✅ Передаем функцию обновления
                />
            )}
        </div>
    );
};

export default MealTracker;
