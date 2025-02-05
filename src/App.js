import React, { useState, useEffect } from "react";
import "./App.css";
import BackgroundParticles from "./components/BackgroundParticles";
import Calendar from "./components/pages/Calendar";
import Dumbbell from "./components/pages/Dumbbell";
import Settings from "./components/pages/Settings";

function App() {
    const [activeTab, setActiveTab] = useState("calendar");

    useEffect(() => {
        // Принудительно загружаем Telegram API
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        script.onload = () => {
            if (window.Telegram && window.Telegram.WebApp) {
                console.log("✅ Telegram API загружен!", window.Telegram.WebApp);
                window.Telegram.WebApp.ready();
                window.Telegram.WebApp.expand();
            } else {
                console.warn("❌ Telegram API не загрузился!");
            }
        };
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
    const disableBodyScroll = (e) => {
        if (!document.querySelector(".calendar-wrapper")?.contains(e.target)) {
            e.preventDefault();
        }
    };

    document.body.style.overflow = "hidden"; // 🔒 Запрещаем скроллинг в остальной части приложения
    document.addEventListener("touchmove", disableBodyScroll, { passive: false });

    return () => {
        document.body.style.overflow = ""; // 🔓 Возвращаем скролл обратно при выходе
        document.removeEventListener("touchmove", disableBodyScroll);
    };
}, []);

    // Функция для виброотклика
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

    // Функция переключения вкладок с виброоткликом
    const handleTabChange = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            triggerHapticFeedback();
        }
    };

    const getIndicatorPosition = () => {
        switch (activeTab) {
            case "calendar":
                return "0%";
            case "dumbbell":
                return "33.33%";
            case "settings":
                return "66.66%";
            default:
                return "0%";
        }
    };

    return (
        <div className="app">
            {/* Фоновая анимация */}
            <BackgroundParticles />

            {/* Контент приложения */}
            <main className="scrollable-content">
                {activeTab === "calendar" && <Calendar />}
                {activeTab === "dumbbell" && <Dumbbell />}
                {activeTab === "settings" && <Settings />}
            </main>

            {/* Нижняя панель навигации */}
            <nav className="tab-bar">
                <div className="active-indicator" style={{ left: getIndicatorPosition() }}></div>

                <button className={activeTab === "calendar" ? "active" : ""} onClick={() => handleTabChange("calendar")}>
                    <img src={`${process.env.PUBLIC_URL}/icons/calendar.svg`} alt="Calendar" className="button-icon" />
                </button>
                <button className={activeTab === "dumbbell" ? "active" : ""} onClick={() => handleTabChange("dumbbell")}>
                    <img src={`${process.env.PUBLIC_URL}/icons/dumbbell.svg`} alt="Dumbbell" className="button-icon" />
                </button>
                <button className={activeTab === "settings" ? "active" : ""} onClick={() => handleTabChange("settings")}>
                    <img src={`${process.env.PUBLIC_URL}/icons/settings.svg`} alt="Settings" className="button-icon" />
                </button>
            </nav>
        </div>
    );
}

export default App;