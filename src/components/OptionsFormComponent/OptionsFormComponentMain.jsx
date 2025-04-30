import React, { useState } from 'react';
import ModelSelectorComponentMain from "./ModelSelectorComponent/ModelSelectorComponentMain.jsx";
import './OptionsFormComponentStyles.css';

export default function OptionsFormComponentMain({isVisible, onModelChange, onOptionsChange }) {
    const [options, setOptions] = useState({
        temperature: 0.8,
        top_p: 1,
        top_k: 40,
        presence_penalty: 0,
        frequency_penalty: 0,
        repeat_penalty: 1,
        num_ctx: 2048,
        seed: -1,
        num_predict: 128,
        mirostat: 0,
        mirostat_tau: 5.0,
        mirostat_eta: 0.1,
    });

    const handleChange = (key, value) => {
        const newOptions = { ...options, [key]: value };
        setOptions(newOptions);
        onOptionsChange?.(newOptions);
    };

    var handleModelChange = (state) => {
        onModelChange?.(state);
    }

    const sliders = [
        ['temperature', 0.0, 2.0, 0.01],
        ['top_p', 0.0, 1.0, 0.01],
        ['top_k', 0, 100, 1],
        ['presence_penalty', -2.0, 2.0, 0.1],
        ['frequency_penalty', -2.0, 2.0, 0.1],
        ['repeat_penalty', 0.5, 2.0, 0.1],
        ['num_ctx', 256, 8192, 256],
        ['num_predict', 1, 2048, 1],
        ['seed', -1, 999999, 1],
        ['mirostat', 0, 2, 1],
        ['mirostat_tau', 0.1, 10.0, 0.1],
        ['mirostat_eta', 0.01, 1.0, 0.01],
    ];

    return isVisible ? (
        <div id='options-form-container'>
            <h2>Ollama Model Options:</h2>
            <form className="options-form">
                {sliders.map(([key, min, max, step]) => (
                    <div key={key} className="options-form-group">
                        <label htmlFor={key}>
                            {key}: <span className="options-form-value">{options[key]}</span>
                        </label>
                        <input
                            id={key}
                            type="range"
                            value={options[key]}
                            min={min}
                            max={max}
                            step={step}
                            onChange={(e) => handleChange(key, parseFloat(e.target.value))}
                        />
                    </div>
                ))}
            </form>
            <ModelSelectorComponentMain onModelChange={handleModelChange}/>
        </div>
    ): null;
}