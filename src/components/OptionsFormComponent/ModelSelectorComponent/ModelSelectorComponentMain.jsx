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
        minHeight: '25px',
        border: 'none',
        boxShadow: 'none',
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
        display: 'none',
    }),
};

export default function ModelSelectorComponentMain({ availableModels, selectedModel, onModelChange }) {

    useEffect(() => {
        console.log("Selector received models:", availableModels);
    }, [availableModels, selectedModel]);

    const handleChange = (selectedOption) => {
        onModelChange && onModelChange(selectedOption.label); // notify parent on user change
    };

    return (
        <Select
            options={availableModels}
            styles={customStyles}
            menuPlacement="top"
            placeholder={availableModels[0].label}
            onChange={handleChange}
        />
    );
}