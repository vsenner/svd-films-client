import React from 'react';
import './Input.scss'

const Input = ({setValue, className, ...props}) => {
  const classNames = [className] || [];
  classNames.push('Input');
  return (
    <input
      className={classNames.join(' ')}
      {...props}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default Input;