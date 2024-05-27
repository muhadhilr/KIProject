import React from 'react';

const Dropdown = ({ options, selectedOption, onChange }) => {
  return (
    <select
      className="w-full rounded-2xl p-2 pl-3 focus:outline-none mt-2 border border-[#B9B6B3]"
      value={selectedOption}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
