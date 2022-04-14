import {FC, MouseEventHandler} from "react";
import './Button.scss';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary'
}

interface ButtonStyles {
  type: ButtonType,
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

const Button: FC<ButtonStyles> =
  (
    {children, onClick, type}
  ) => {
    return (
      <button
        className={`btn btn-${type}`}
        onClick={onClick}>
        {children}
      </button>
    )
  }

export default Button;