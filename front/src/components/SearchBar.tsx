import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Buscar actividad..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded-lg mb-4"
    />
  );
};

export default SearchBar;
