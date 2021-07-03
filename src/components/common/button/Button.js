import React from "react";
import "./Button.css";

const Button = ({ children, onClickHandler }) => {
  return (
    <button onClick={onClickHandler} className="buttons">
      {children}
    </button>
  );
};

export default Button;
