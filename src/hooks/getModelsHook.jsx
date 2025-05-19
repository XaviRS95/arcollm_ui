import { useEffect, useState } from "react";
import { getModelsCall } from "../api/getModelsCall.jsx";

export function useModels() {
    const [model, setModel] = useState("0 models");
    const [availableModels, setAvailableModels] = useState([]);

    useEffect(() => {
        async function loadModels() {
            const models = await getModelsCall();
            setAvailableModels(models);
        }
        loadModels();
    }, []);

    useEffect(() => {
        if(availableModels.length > 0){
            setModel(availableModels[0].label);
        }
    }, [availableModels]);

    return { model, availableModels};
}