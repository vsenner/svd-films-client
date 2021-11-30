import React from 'react';
import './Input.scss'

const Input = (props) => {

    return (
        <input
            {...props}
            onChange={e => props.setValue(e.target.value)}
        />
    );
};

export default Input;