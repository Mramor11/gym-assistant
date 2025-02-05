import React, { useState, useEffect } from "react";
import "./App.css";
import BackgroundParticles from "./components/BackgroundParticles";
import Calendar from "./components/pages/Calendar";
import Dumbbell from "./components/pages/Dumbbell";
import Settings from "./components/pages/Settings";

function App() {
    const [activeTab, setActiveTab] = useState("calendar");

    useEffect(() => {
        const preventScroll = (e) => e.preventDefault();
        document.addEventListener("touchmove", preventScroll, { passive: false });

        return () => {
            document.removeEventListener("touchmove", preventScroll);
        };
    }, []);

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            console.log("✅ Telegram WebApp API доступен:", window.Telegram.WebApp);
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
        } else {
            console.warn("❌ Telegram WebApp API недоступен!");
        }
    }, []);

    // 🔥 Новый Haptic Feedback (копирует @DurovCapsBot)
    const triggerFeedback = (type = "impact", style = "medium") => {
        if (!window.Telegram || !window.Telegram.WebApp) {
            console.warn("❌ Telegram WebApp API не найден!");
            return;
        }

        const webAppVersion = window.Telegram.WebApp.version;
        const versionAtLeast = (minVersion) => {
            return parseFloat(webAppVersion) >= parseFloat(minVersion);
        };

        if (!versionAtLeast("6.1")) {
            console.warn(`[Telegram.WebApp] HapticFeedback не поддерживается в версии ${webAppVersion}`);
            return;
        }

        let params;
        if (type === "impact") {
            params = { type: "impact", impact_style: style };
        } else if (type === "notification") {
            params = { type: "notification", notification_type: style };
        } else if (type === "selection_change") {
            params = { type: "selection_change" };
        } else {
            console.error("[Telegram.WebApp] Некорректный тип Haptic Feedback", type);
            return;
        }

        if (window.Telegram.WebApp.platform === "ios") {
            window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
        } else {
            window.Telegram.WebApp.sendData("web_app_trigger_haptic_feedback", params);
        }
    };

    const handleTabChange = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            setTimeout(() => triggerFeedback("impact", "medium"), 50);
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
            <BackgroundParticles />

            <main className="scrollable-content">
                {activeTab === "calendar" && <Calendar />}
                {activeTab === "dumbbell" && <Dumbbell />}
                {activeTab === "settings" && <Settings />}
            </main>

            <nav className="bottom-nav">
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