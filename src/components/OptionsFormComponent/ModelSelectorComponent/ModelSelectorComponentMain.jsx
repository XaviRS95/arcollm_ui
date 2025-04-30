import Select from 'react-select';
import './ModelSelectorComponentStyles.css';
import {useEffect, useState} from "react";
const customStyles = {
    control: (provided) => ({
        ...provided,
        width: 'auto',
        maxHeight: '30px',
        backgroundColor: '#40414f',
        borderRadius: '10px',
        color: 'white',
        minHeight: '25px', // prevent larger heights
        border: 'none',
        boxShadow: 'none', // remove default box shadow
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#40414f',
        borderRadius: '10px',
        marginTop: 0,
    }),
    option: (provided, state) => ({
        ...provided,
        width: '100%',
        backgroundColor: state.isFocused ? '#55555e' : '#343541',
        color: 'white',
        border: '1px solid white',
        borderRadius: '10px',
        margin: '1px 0',
        padding: '5px 10px',
        cursor: 'pointer',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'white',
        padding: 4,
    }),
    indicatorSeparator: () => ({
        display: 'none', // removes the little vertical separator
    }),
};


export default function ModelSelectorComponentMain({onModelChange}) {
    var [model, setModel] = useState("0 models");
    var [availableModels, setAvailableModels] = useState([]);


    const handleChange = (selectedOption) => {
        setModel(selectedOption.label);
        onModelChange && onModelChange(selectedOption.label); // notify parent on user change
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
                setAvailableModels(data);
            } catch (error) {
                console.error("Model List collection error:", error);
            }
        }
        getModels();
    }, []);

    useEffect(() => {
        if (availableModels && availableModels.length > 0) {
            setModel(availableModels[0].label);
            onModelChange && onModelChange(availableModels[0]); //Updates selected model
        }
    }, [availableModels]);  // <--- react to changes in models only

    return (
        <Select
            options={availableModels}
            styles={customStyles}
            menuPlacement="top"
            placeholder={model}
            onChange={handleChange}
        />
    );
}