import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import BackgroundParticles from "./components/BackgroundParticles";
import Calendar from "./components/pages/Trackers/Calendar";
import Dumbbell from "./components/pages/Dumbbell";
import Settings from "./components/pages/Settings/Settings";
import FoodSelection from "./components/pages/Trackers/Nutrition/FoodSelection";

function App() {
    const [activeTab, setActiveTab] = useState("calendar");
    const [isFoodSelectionOpen, setIsFoodSelectionOpen] = useState(false);
    const calendarRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
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
        if (isFoodSelectionOpen) {
            document.body.classList.add("food-selection-open");
        } else {
            document.body.classList.remove("food-selection-open");
        }
    }, [isFoodSelectionOpen]);

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

    const openFoodSelection = () => {
        if (calendarRef.current) {
            setScrollPosition(calendarRef.current.scrollTop); // ✅ Запоминаем позицию скролла
        }
        setIsFoodSelectionOpen(true);
    };

    const closeFoodSelection = () => {
        setIsFoodSelectionOpen(false);
    };

    return (
        <div className="app">
            <BackgroundParticles />

            <main className="scrollable-content">
                {isFoodSelectionOpen ? (
                    <FoodSelection onClose={closeFoodSelection} />
                ) : (
                    <>
                        {activeTab === "calendar" && (
                            <Calendar onOpenFoodSelection={openFoodSelection} ref={calendarRef} scrollPosition={scrollPosition} />
                        )}
                        {activeTab === "dumbbell" && <Dumbbell />}
                        {activeTab === "settings" && <Settings />}
                    </>
                )}
            </main>

            {!isFoodSelectionOpen && (
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
            )}
        </div>
    );
}

export default App;