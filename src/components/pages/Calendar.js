import React, { useState, useEffect } from "react";
import "./Calendar.css"; // Стили
import CalorieCounter from "./CalorieCounter"; // Новый компонент

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


            {/* Добавляем новый счетчик калорий */}
            <CalorieCounter
                caloriesLeft={data.caloriesLeft}
                supplied={data.supplied}
                burned={data.burned}
                carbs={data.carbs}
                fat={data.fat}
                protein={data.protein}
            />

            <div className="bottom-space"></div>
        </div>
    );
}

export default Calendar;