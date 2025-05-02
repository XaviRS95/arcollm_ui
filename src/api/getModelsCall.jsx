export async function getModelsCall() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const API_MODELS_LIST = import.meta.env.VITE_API_MODELS_LIST
    const response = await fetch(BASE_URL + API_MODELS_LIST, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch models");
    }
    const data = await response.json();
    return data.models.map((model) => ({
        value: model,
        label: model
    }));
}