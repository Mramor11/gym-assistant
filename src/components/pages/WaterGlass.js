import React from "react";
import "./WaterGlass.css"; // Подключаем стили

const WaterGlass = ({ isFilled, onClick }) => {
    return (
        <div className="glass-container" onClick={onClick}>
            <div className="glass">
                {/* Вода */}
                <div className="water" style={{ height: isFilled ? "100%" : "0%" }}>
                    {/* 🔥 Пузырьки воздуха (появляются при заполнении) */}
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