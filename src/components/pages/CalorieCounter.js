import React from "react";
import "./CalorieCounter.css"; // Подключаем стили

const CircularProgress = ({ value, maxValue, size, strokeWidth, color }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / maxValue) * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Фон (серый круг) */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#222"
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Прогресс (динамичный круг) */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`} // Вращаем чтобы начинался сверху
            />
        </svg>
    );
};

const CalorieCounter = ({ caloriesLeft, supplied, burned, carbs, fat, protein }) => {
    return (
        <div className="calorie-counter">
            {/* Основной контейнер (главный круг + supplied/burned) */}
            <div className="main-progress-container">
                {/* "Supplied" (слева) */}
                <div className="calories-info supplied">
                    <span>⬆</span>
                    <h3>{supplied}</h3>
                    <p>supplied</p>
                </div>

                {/* Основной круговой прогресс */}
                <div className="main-circle">
                    <CircularProgress value={caloriesLeft} maxValue={3500} size={150} strokeWidth={10} color="#4ade80" />
                    <div className="main-text">
                        <h2>{caloriesLeft}</h2>
                        <p>kcal left</p>
                    </div>
                </div>

                {/* "Burned" (справа) */}
                <div className="calories-info burned">
                    <span>⬇</span>
                    <h3>{burned}</h3>
                    <p>burned</p>
                </div>
            </div>

            {/* Мини-графики макронутриентов (в один ряд) */}
            <div className="macronutrients">
                <div className="macro">
                    <CircularProgress value={carbs.current} maxValue={carbs.goal} size={50} strokeWidth={6} color="#22c55e" />
                    <p>{carbs.current}/{carbs.goal} g <br />carbs</p>
                </div>
                <div className="macro">
                    <CircularProgress value={fat.current} maxValue={fat.goal} size={50} strokeWidth={6} color="#facc15" />
                    <p>{fat.current}/{fat.goal} g <br />fat</p>
                </div>
                <div className="macro">
                    <CircularProgress value={protein.current} maxValue={protein.goal} size={50} strokeWidth={6} color="#3b82f6" />
                    <p>{protein.current}/{protein.goal} g <br />protein</p>
                </div>
            </div>
        </div>
    );
};

export default CalorieCounter;