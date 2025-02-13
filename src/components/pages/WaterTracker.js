import React, { useState, useEffect } from "react";
import "./WaterTracker.css";
import WaterGlass from "./WaterGlass"; // Импортируем стаканы

const WaterTracker = () => {
    const glassSize = 0.25; // Один стакан = 250 мл
    const minGlasses = 8; // Минимальное количество стаканов
    const maxGlasses = 20; // Максимум стаканов (до 5 литров)
    const goal = 2.0; // Фиксированная цель (2 литра)
    const maxLiters = 5.0; // Ограничение в 5 литров

    const [water, setWater] = useState(0);
    const [glasses, setGlasses] = useState(minGlasses);
    const [removingGlass, setRemovingGlass] = useState(null); // Индекс удаляемого стакана
    const [newGlassAdded, setNewGlassAdded] = useState(false); // Флаг для анимации появления

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

        if (newGlasses > glasses) {
            setNewGlassAdded(true);
            setTimeout(() => setNewGlassAdded(false), 500); // Анимация появления
        }

        setGlasses(newGlasses);
    };

    // Добавление воды (только если нажали на первый пустой стакан)
    const addWater = (index) => {
        if (index === Math.floor(water / glassSize) && water + glassSize <= maxLiters) {
            setWater(water + glassSize);
        }
    };

    // Удаление воды (только если нажали на последний заполненный стакан)
    const removeWater = (index) => {
        const lastExtraGlassIndex = minGlasses + Math.floor((water - goal) / glassSize);

        // ✅ Анимируем исчезновение последнего **пустого** стакана
        if (index === lastExtraGlassIndex && glasses > minGlasses) {
            setRemovingGlass(index); // Помечаем стакан как удаляемый
            setTimeout(() => {
                setWater(water - glassSize);
                setRemovingGlass(null); // Убираем стакан после анимации
            }, 300); // Ожидаем завершения анимации
        }
        // ✅ Если удаляем обычный стакан (без анимации)
        else if (index === Math.floor((water - glassSize) / glassSize) && water - glassSize >= 0) {
            setWater(water - glassSize);
        }
    };

    return (
        <div className="water-tracker">
            <h2>{water.toFixed(2)} L</h2>

            {/* Динамическое количество стаканов */}
            <div className="glasses-container">
                {[...Array(glasses)].map((_, index) => (
                    <div key={index} className={`glass-wrapper 
                        ${index === removingGlass ? "removing-glass" : ""} 
                        ${newGlassAdded && index === glasses - 1 ? "new-glass" : ""}`}>
                        <WaterGlass
                            isFilled={index < water / glassSize}
                            showBubbles={index < water / glassSize} // Пузырьки во всех заполненных стаканах
                            isInteractive={
                                index === Math.floor(water / glassSize) || // Первый пустой стакан
                                index === Math.floor((water - glassSize) / glassSize) // Последний заполненный стакан
                            }
                            onClick={() => {
                                if (index === Math.floor(water / glassSize)) {
                                    addWater(index);
                                } else if (index === Math.floor((water - glassSize) / glassSize)) {
                                    removeWater(index);
                                }
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Фиксированная цель */}
            <p className="water-goal">Goal: {goal.toFixed(2)} L</p>
        </div>
    );
};

export default WaterTracker;