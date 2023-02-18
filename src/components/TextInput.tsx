import React from "react";

interface Props {
  value: string | number;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  name: string;
  placeholder: string;
  type: string;
}

const TextInput: React.FC<Props> = ({
  name,
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="py-1 px-3 border-2  border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
    />
  );
};

export default TextInput;
