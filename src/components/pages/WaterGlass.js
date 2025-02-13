import React from "react";
import "./WaterGlass.css"; // Подключаем стили

const WaterGlass = ({ isFilled, onClick }) => {
    // Функция для виброотклика через Telegram WebApp
    const triggerHapticFeedback = () => {
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
            try {
                window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
            } catch (error) {
                console.warn("⚠️ Виброотклик недоступен", error);
            }
        } else {
            console.warn("❌ Telegram WebApp Haptic API не поддерживается");
        }
    };

    // Обработчик клика (с добавлением вибрации)
    const handleClick = () => {
        if (onClick) {
            triggerHapticFeedback(); // 📳 Включаем вибрацию
            onClick(); // Заполняем/удаляем воду
        }
    };

    return (
        <div className="glass-container" onClick={handleClick}>
            <div className="glass">
                {/* Вода */}
                <div className="water" style={{ height: isFilled ? "100%" : "0%" }}>
                    {/* 🔥 Пузырьки воздуха теперь на всех заполненных стаканах */}
                    {isFilled && (
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