import React, { useState, useEffect } from "react";
import "./WaterTracker.css"; // Подключаем стили

const WaterTracker = () => {
    const goal = 2.0; // Цель в литрах
    const glassSize = 0.25; // Один стакан 250 мл
    const totalGlasses = 8; // Всего 8 стаканов
    const [water, setWater] = useState(0);

    // Загружаем данные из localStorage
    useEffect(() => {
        const savedWater = localStorage.getItem("waterIntake");
        if (savedWater) {
            setWater(parseFloat(savedWater));
        }
    }, []);

    // Обновляем localStorage при изменении воды
    useEffect(() => {
        localStorage.setItem("waterIntake", water.toString());
    }, [water]);

    // Функция для добавления воды (один стакан)
    const addWater = () => {
        if (water + glassSize <= goal) {
            setWater(water + glassSize);
        }
    };

    return (
        <div className="water-tracker">
            {/*<h3>Water Tracker</h3>*/}
            <div className="water-header">
                <h4>Water</h4>
                <p>Goal: {goal.toFixed(2)} L</p>
            </div>
            <h2>{water.toFixed(2)} L</h2>

            {/* Стаканы воды */}
            <div className="glasses-container">
                {[...Array(totalGlasses)].map((_, index) => (
                    <div
                        key={index}
                        className={`glass ${index < water / glassSize ? "filled" : ""}`}
                        onClick={index === Math.floor(water / glassSize) ? addWater : undefined}
                    >
                        {index === Math.floor(water / glassSize) && <span>+</span>}
                    </div>
                ))}
            </div>

            <p className="water-food">+ Water from food: 0 mL</p>
        </div>
    );
};

export default WaterTracker;