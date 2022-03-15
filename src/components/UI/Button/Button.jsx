import React from 'react';
import './Button.scss'

const Button = ({children, className, ...props}) => {
  const classNames = [className] || [];
  classNames.push('Button');
  return (
    <button className={classNames.join(' ')} {...props}>
      {children}
    </button>
  );
};

export default Button;