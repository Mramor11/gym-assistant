import React, { useState } from "react";
import "./WaterGlass.css"; // Подключаем стили

const WaterGlass = ({ isFilled, showBubbles, onClick }) => {
    // Функция для виброотклика
    const triggerHapticFeedback = () => {
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]); // 📳 Виброотклик: 50мс - пауза - 50мс
        }
    };

    // Обработчик клика (с добавлением вибрации)
    const handleClick = () => {
        if (onClick) {
            triggerHapticFeedback(); // Включаем вибрацию
            onClick(); // Заполняем/удаляем воду
        }
    };

    return (
        <div className="glass-container" onClick={handleClick}>
            <div className="glass">
                {/* Вода */}
                <div className="water" style={{ height: isFilled ? "100%" : "0%" }}>
                    {/* Пузырьки воздуха */}
                    {showBubbles && (
                        <>
                            <div className="bubble small" style={{ left: "30%", animationDelay: "0.3s", "--speed": "2.2s" }}></div>
                            <div className="bubble medium" style={{ left: "55%", animationDelay: "0.6s", "--speed": "2.8s" }}></div>
                            <div className="bubble large" style={{ left: "70%", animationDelay: "0.9s", "--speed": "2.5s" }}></div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WaterGlass;