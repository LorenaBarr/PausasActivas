import React, { useState } from 'react';

const options = [
  'Pausas activas físicas',
  'Pausas activas visuales',
  'Pausas activas cognitivas',
  'Pausas recreativas',
  'Pausas activas ergonómicas',
];

interface Props {
  onSubmit: (selected: string[]) => void;
}

const InterestModal: React.FC<Props> = ({ onSubmit }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : prev.length < 3
        ? [...prev, option]
        : prev
    );
  };

  const handleSubmit = () => {
    if (selected.length === 3) {
      onSubmit(selected);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-700">¿Qué pausas te interesan?</h2>
        <div className="flex flex-col gap-2 mb-4">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                disabled={!selected.includes(option) && selected.length >= 3}
              />
              {option}
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={selected.length !== 3}
          className="w-full bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default InterestModal;
