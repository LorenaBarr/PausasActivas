import React from 'react';

interface Props {
  category: string;
  title: string;
  description: string;
  image: string;
  onComplete: () => void;
  disabled: boolean;
}

const ActivityCard: React.FC<Props> = ({
  category,
  title,
  description,
  image,
  onComplete,
  disabled,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden max-w-sm w-full">
      <img src={image} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h4 className="text-blue-700 font-semibold">{category}</h4>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <button
          onClick={onComplete}
          disabled={disabled}
          className={`w-full py-2 px-4 rounded-lg text-white ${
            disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {disabled ? 'Completado' : 'Marcar como completada'}
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
