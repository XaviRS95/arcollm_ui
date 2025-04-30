import './TextInputComponentStyles.css'
import React, {useEffect, useState} from "react";
import send_icon from "/send-icon.png";
import options_icon from "/options-icon.png";
import ModelSelectorComponentMain from "./ModelSelectorComponent/ModelSelectorComponentMain.jsx";


export default function TextInputComponentMain({onOpenOptions, onSend}){

    const [message, setMessage] = useState("");
    const [rows, setRows] = useState(1);
    const [models, setModels] = useState(null);
    var [selectedModel, setSelectedModel] = useState(null);
    var [openOptions, setOpenOptions] = useState(false);

    const handleSend = () => {
        if (message.trim() === "" && selectedModel === null) return;
        console.log({"prompt": message, "model": selectedModel})
        onSend({"prompt": message, "model": selectedModel});
        setMessage("");
        setRows(1);
    };

    var handleOpenOptions = () => {
        setOpenOptions(!openOptions);
        onOpenOptions(openOptions);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleTextareaChange = (e) => {
        const maxRows = 10;

        const textarea = e.target;
        setMessage(textarea.value);

        const textareaLineHeight = 24; // Approx line height in px, adjust to match your font-size
        const previousRows = e.target.rows;
        e.target.rows = 1; // Reset to measure properly

        const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            e.target.rows = maxRows;
            e.target.scrollTop = e.target.scrollHeight;
        }

        setMessage(e.target.value);
        setRows(currentRows < maxRows ? currentRows : maxRows);
    };

    const handleModelChange = (model) => {
        console.log("Selected model:", model.value);
        setSelectedModel(model.value);
    };

    useEffect(() => {
        async function getModels() {
            try {
                const response = await fetch("http://localhost:8000/api/models_list", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                var data = await response.json();
                data = data.models.map(model => ({
                    value: model,
                    label: model
                }));
                setModels(data);
            } catch (error) {
                console.error("Model List collection error:", error);
            }
        }

        getModels();
    }, []);

    return (
            <div id="TextInputComponentContainer">
                <div id="TextInputComponent">
                <textarea
                    className="chat-textarea"
                    placeholder="Send a message..."
                    value={message}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    rows={rows}
                />
                    <div id="TextInputOptionSelector">
                        <ModelSelectorComponentMain models={models} onModelChange={handleModelChange} />
                        <img className="send-button" src={options_icon} onClick={handleOpenOptions}/>
                        <img className="send-button" src={send_icon} onClick={handleSend}/>
                    </div>
                </div>
            </div>
        );
}