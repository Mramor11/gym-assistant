import React, { useState, useEffect } from "react";
import "./Calendar.css"; // Подключаем стили
import CalorieCounter from "./CalorieCounter"; // Компонент счетчика калорий
import MealTracker from "./MealTracker"; // Компонент отслеживания питания
import WaterTracker from "./WaterTracker"; // Компонент отслеживания воды

function Calendar() {
    const [data, setData] = useState({
        date: new Date().toISOString().split("T")[0],
        caloriesLeft: 2992,
        supplied: 507,
        burned: 825,
        carbs: { current: 59, goal: 524 },
        fat: { current: 13, goal: 97 },
        protein: { current: 30, goal: 131 },
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("nutritionData"));
        if (savedData && savedData.date === new Date().toISOString().split("T")[0]) {
            setData(savedData);
        }
    }, []);

    return (
    <div className="calendar-wrapper">
        {/* Счетчик калорий */}
        <div className="section-title-wrapper">
            <h3 className="section-title">Calories</h3>
        </div>
        <CalorieCounter
            caloriesLeft={data.caloriesLeft}
            supplied={data.supplied}
            burned={data.burned}
            carbs={data.carbs}
            fat={data.fat}
            protein={data.protein}
        />

        {/* Трекер питания */}
        <div className="section-title-wrapper">
            <h3 className="section-title">Nutrition</h3>
            <button className="more-btn">More</button>
        </div>
        <MealTracker />

        {/* Трекер воды */}
        <div className="section-title-wrapper">
            <h3 className="section-title">Water Tracker</h3>
        </div>
        <WaterTracker />

        <div className="bottom-space"></div>
    </div>
);
}

export default Calendar;