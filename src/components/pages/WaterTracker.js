import React, { useState, useEffect } from "react";
import "./WaterTracker.css";
import WaterGlass from "./WaterGlass"; // Импортируем стаканы

const WaterTracker = () => {
    const glassSize = 0.25; // Один стакан = 250 мл
    const minGlasses = 8; // Минимальное количество стаканов (статичны)
    const maxGlasses = 20; // Максимум стаканов (до 5 литров)
    const goal = 2.0; // Фиксированная цель (2 литра)
    const maxLiters = 5.0; // Ограничение в 5 литров

    const [water, setWater] = useState(0);
    const [glasses, setGlasses] = useState(minGlasses);

    // Загружаем данные из localStorage
    useEffect(() => {
        const savedWater = parseFloat(localStorage.getItem("waterIntake")) || 0;
        setWater(savedWater);
        updateGlasses(savedWater);
    }, []);

    // Сохраняем данные при изменении
    useEffect(() => {
        localStorage.setItem("waterIntake", water.toString());
        updateGlasses(water);
    }, [water]);

    // Функция обновления количества стаканов
    const updateGlasses = (currentWater) => {
        let newGlasses = minGlasses;

        if (currentWater >= goal) {
            newGlasses = Math.min(
                minGlasses + Math.floor((currentWater - goal) / glassSize) + 1,
                maxGlasses
            );
        }

        setGlasses(newGlasses);
    };

    // Добавление воды
    const addWater = (index) => {
        if (index === Math.floor(water / glassSize) && water + glassSize <= maxLiters) {
            setWater(water + glassSize);
        }
    };

    // Удаление воды (по клику на последний заполненный стакан)
    const removeWater = (index) => {
        if (index === Math.floor((water - glassSize) / glassSize) && water - glassSize >= 0) {
            setWater(water - glassSize);
        }
    };

    return (
        <div className="water-tracker">
            <h2>{water.toFixed(2)} L</h2>

            {/* Динамическое количество стаканов */}
            <div className="glasses-container">
                {[...Array(glasses)].map((_, index) => {
                    const isExtraGlass = index >= minGlasses; // 🔥 Проверяем, является ли стакан дополнительным
                    return (
                        <div
                            key={index}
                            className={isExtraGlass ? "extra-glass" : ""}
                        >
                            <WaterGlass
                                isFilled={index < water / glassSize}
                                showBubbles={index === Math.floor(water / glassSize) - 1} // Пузырьки только в последнем стакане
                                onClick={() => (index < water / glassSize ? removeWater(index) : addWater(index))}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Фиксированная цель */}
            <p className="water-goal">Goal: {goal.toFixed(2)} L</p>
        </div>
    );
};

export default WaterTracker;