import React from "react";

const Button = ({ children, type, className = "", onClick = () => {} }) => {
  return (
    <button className={`mt-2 rounded-2xl w-full p-2 text-p2 bg-sky-500 text-white hover:bg-sky-400 ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
