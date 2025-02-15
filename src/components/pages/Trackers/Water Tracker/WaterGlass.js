import React from "react";
import "./WaterGlass.css"; // Подключаем стили

const WaterGlass = ({ isFilled, onClick, isInteractive }) => {
    // Функция для серии виброоткликов
    const triggerHapticFeedbackSeries = (isAdding) => {
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
            try {
                let intensities = [
                    "light", "light", "light", "light", "light",
                    "medium", "medium", "medium", "medium", "medium",
                    "heavy", "heavy", "heavy", "heavy"
                ]; // Градации виброотклика

                let steps = isAdding ? intensities : intensities.reverse(); // Увеличиваем или уменьшаем силу

                steps.forEach((intensity, index) => {
                    setTimeout(() => {
                        window.Telegram.WebApp.HapticFeedback.impactOccurred(intensity);
                    }, index * 40); // Интервал 40 мс
                });
            } catch (error) {
                console.warn("⚠️ Виброотклик недоступен", error);
            }
        } else {
            console.warn("❌ Telegram WebApp Haptic API не поддерживается");
        }
    };

    // Обработчик клика (виброотклик ТОЛЬКО на интерактивный стакан)
    const handleClick = () => {
        if (onClick && isInteractive) {
            triggerHapticFeedbackSeries(!isFilled); // 📳 Включаем серию вибраций
            onClick(); // Заполняем/удаляем воду
        }
    };

    return (
        <div className={`glass-container ${isInteractive ? "clickable" : ""}`} onClick={handleClick}>
            <div className="glass">
                {/* Вода */}
                <div className="water" style={{ height: isFilled ? "100%" : "0%" }}>
                    {/* 🔥 Пузырьки воздуха во ВСЕХ заполненных стаканах */}
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