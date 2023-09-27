import React from "react";

interface Props {
  value?: string;
  extend?: string;
  onClick?: any;
  children?: any;
  className?: any;
}

const Button = ({ children, value, className, onClick }: Props) => {
  return (
    <button onClick={onClick} className={className} value={value}>
      {children}
    </button>
  );
};

export default Button;
