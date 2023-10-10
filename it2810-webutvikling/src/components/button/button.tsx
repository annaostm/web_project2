import React from "react";
import "./button.css";

interface Props {
  children?: React.ReactNode;

  onClick: () => void;

  display: string;
}

//Component for Custom button using Class component
const CustomButton: React.FC<Props> = ({ children, onClick, display }) => {
  return (
    <button
      className="button"
      onClick={onClick}
      style={{
        display,
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
