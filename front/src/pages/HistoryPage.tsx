
import dayjs from 'dayjs';

const HistoryPage = () => {
  const history = [
    { date: '2025-06-10', activities: ['Descanso visual', 'Estiramiento cuello'] },
    { date: '2025-06-09', activities: ['Respiración consciente'] },
  ];

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Historial de actividades</h2>
      {history.map((h, i) => (
        <div key={i} className="mb-4">
          <h4 className="text-blue-600 font-semibold">{dayjs(h.date).format('DD/MM/YYYY')}</h4>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            {h.activities.map((a, idx) => <li key={idx}>{a}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HistoryPage;
