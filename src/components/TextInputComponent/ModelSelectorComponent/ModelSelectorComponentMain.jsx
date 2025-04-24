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


export default function ModelSelectorComponentMain({models, onModelChange}) {
    var [model, setModel] = useState("0 models");

    const handleChange = (selectedOption) => {
        setModel(selectedOption.label);
        onModelChange && onModelChange(selectedOption); // notify parent on user change
    };

    useEffect(() => {
        if (models && models.length > 0) {
            setModel(models[0].label);
            onModelChange && onModelChange(models[0]); //Updates selected model
        }
    }, [models]);  // <--- react to changes in models only

    return (
        <Select
            options={models}
            styles={customStyles}
            menuPlacement="top"
            placeholder={model}
            onChange={handleChange}
        />
    );
}