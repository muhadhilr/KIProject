import React from "react";

const Input = ({
  children,
  name = "input",
  value,
  placeholder,
  type,
  onChange = () => {},
  id,
  bgColor = "transparent",
}) => {
  return (
    <div className="my-3">
      <label htmlFor={id} className="font-semiBold">
        {children}
      </label>
      <input
        type={type}
        className={`w-full rounded-2xl p-2 pl-3 focus:outline-none mt-2 border border-[#B9B6B3]`}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
        name={name}
        required
        style={{ backgroundColor: bgColor }}
      />
    </div>
  );
};

export default Input;
