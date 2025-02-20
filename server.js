require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // ✅ Разрешаем CORS
app.use(express.json());

const FATSECRET_BASE_URL = "https://platform.fatsecret.com/rest/server.api";
const ACCESS_TOKEN = process.env.FATSECRET_ACCESS_TOKEN;

// 🔥 Роут для проксирования запроса
app.get("/search-food", async (req, res) => {
    const query = req.query.q;

    try {
        const response = await axios.get(FATSECRET_BASE_URL, {
            params: {
                method: "foods.search",
                search_expression: query,
                format: "json",
            },
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Ошибка при запросе к FatSecret:", error.message);
        res.status(500).json({ error: "Ошибка при запросе к FatSecret API" });
    }
});

app.listen(PORT, () => console.log(`✅ Сервер работает на http://localhost:${PORT}`));