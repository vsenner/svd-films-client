import {FC, MouseEventHandler} from "react";
import './Button.scss';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary'
}

interface ButtonStyles {
  height?: number,
  width?: number,
  text: string,
  type: ButtonType,
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

const defaultStyle = {
  height: 40, width: 100
};

const Button:FC<ButtonStyles> =
  (
    {height , width, children, onClick, type}
  ) => {
    return (
      <button
        className={`btn btn-${type}`}
        style={
          {
            height: (height || defaultStyle.height) + 'px',
            width: (width || defaultStyle.width),
          }
        }
        onClick={onClick}>
        {children}
      </button>
    )
  }

export default Button;