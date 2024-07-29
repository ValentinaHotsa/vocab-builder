import React, { useEffect, useRef, useState } from "react";
import svg from "../../assets/icon.svg";

const Dropdown = ({
  defaultOption,
  onSelect,
  options,
  className,
  dropHeader,
  dropList,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dropdownRef = useRef(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  const upperCaseFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div ref={dropdownRef} className={className}>
      <div className={dropHeader} onClick={() => setIsOpen(!isOpen)}>
        {upperCaseFirstLetter(selectedOption)}
        <svg>
          <use href={`${svg}#icon-down`} />
        </svg>
      </div>

      {isOpen && (
        <div className={dropList}>
          <ul>
            {options.map((option) => (
              <li key={option} onClick={() => handleSelectOption(option)}>
                {upperCaseFirstLetter(option)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
