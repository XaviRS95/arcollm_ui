import React, { useState } from 'react';
import './OptionsFormComponentStyles.css';

export default function OptionsFormComponentMain({ onChange }) {
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
        stop: '',
        stream: true,
        grammar: '',
    });

    const handleChange = (key, value) => {
        const newOptions = { ...options, [key]: value };
        setOptions(newOptions);
        onChange?.(newOptions);
    };

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

    return (
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



            <div className="options-form-group">
                <label htmlFor="stop">Stop token(s) (comma separated)</label>
                <input
                    id="stop"
                    type="text"
                    value={options.stop}
                    onChange={(e) => handleChange('stop', e.target.value)}
                />
            </div>

            <div className="options-form-group">
                <label htmlFor="grammar">Grammar</label>
                <input
                    id="grammar"
                    type="text"
                    value={options.grammar}
                    onChange={(e) => handleChange('grammar', e.target.value)}
                />
            </div>

            <div className="options-form-group options-form-checkbox">
                <label htmlFor="stream">
                    <input
                        id="stream"
                        type="checkbox"
                        checked={options.stream}
                        onChange={(e) => handleChange('stream', e.target.checked)}
                    />
                    Stream
                </label>
            </div>
        </form>
    );
}