import React, { useState, useEffect } from "react";
import "./Calendar.css"; // Подключаем стили

function Calendar() {
    const [data, setData] = useState({
        date: new Date().toISOString().split("T")[0],
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        water: 0,
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("nutritionData"));
        if (savedData && savedData.date === new Date().toISOString().split("T")[0]) {
            setData(savedData);
        }
    }, []);

    const updateStorage = (updatedData) => {
        setData(updatedData);
        localStorage.setItem("nutritionData", JSON.stringify(updatedData));
    };

    return (
        <div className="calendar-container">
            {/* Контейнер "Today's Intake" */}
            <div className="intake-summary">
                <h2>Today's Intake</h2>
                <div className="intake-labels">
                    <span>Calories</span>
                    <span>Proteins</span>
                    <span>Fats</span>
                    <span>Carbs</span>
                    <span>Water</span>
                </div>
                <div className="intake-values">
                    <span>{data.calories} kcal</span>
                    <span>{data.protein} g</span>
                    <span>{data.fat} g</span>
                    <span>{data.carbs} g</span>
                    <span>{(data.water / 1000).toFixed(1)} L</span>
                </div>
            </div>

            {/* Контейнер с прогресс-барами */}
            <div className="progress-container">
                <h3>Progress</h3>
                <div className="progress-bar">
                    <span>Calories</span>
                    <div className="progress">
                        <div className="fill" style={{ width: `${(data.calories / 2500) * 100}%` }}></div>
                    </div>
                </div>
                <div className="progress-bar">
                    <span>Protein</span>
                    <div className="progress">
                        <div className="fill" style={{ width: `${(data.protein / 100) * 100}%` }}></div>
                    </div>
                </div>
                <div className="progress-bar">
                    <span>Fat</span>
                    <div className="progress">
                        <div className="fill" style={{ width: `${(data.fat / 80) * 100}%` }}></div>
                    </div>
                </div>
                <div className="progress-bar">
                    <span>Carbs</span>
                    <div className="progress">
                        <div className="fill" style={{ width: `${(data.carbs / 300) * 100}%` }}></div>
                    </div>
                </div>
                <div className="progress-bar">
                    <span>Water</span>
                    <div className="progress">
                        <div className="fill" style={{ width: `${(data.water / 3000) * 100}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Контейнер для ввода значений (оставляем пустым) */}
            <div className="input-container">
                <h3>Input Section (Coming Soon)</h3>
            </div>
        </div>
    );
}

export default Calendar;