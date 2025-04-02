//src/utils/api.js

import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/drinks`,
    headers: {
        "content-type": "application/json",
    },
});

export default api;
