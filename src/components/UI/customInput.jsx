import React from 'react';
import './customInput.scss'

const CustomInput = (props) => {

    return (
        <input
            className="customInput"
            {...props}
        />
    );
};

export default CustomInput;