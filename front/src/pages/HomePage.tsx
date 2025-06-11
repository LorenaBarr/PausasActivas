import  { useEffect, useState } from 'react';
import ActivityCard from '../components/ActivityCard';
import SearchBar from '../components/SearchBar';
import InterestModal from '../components/InterestModal';

const HomePage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(true); // simula primera vez

  useEffect(() => {
    // Simulamos fetch de 3 actividades
    setActivities([
      {
        id: 1,
        category: 'Visual',
        title: 'Descanso visual 20-20-20',
        description: 'Cada 20 minutos, mira a 20 pies por 20 segundos.',
        image: '/assets/visual.jpg',
      },
      {
        id: 2,
        category: 'Física',
        title: 'Estiramiento de cuello',
        description: 'Gira suavemente tu cuello hacia los lados por 30 seg.',
        image: '/assets/fisica.jpg',
      },
      {
        id: 3,
        category: 'Cognitiva',
        title: 'Respiración consciente',
        description: 'Inhala y exhala lentamente durante 1 minuto.',
        image: '/assets/cognitiva.jpg',
      },
    ]);
  }, []);

  const handleComplete = (id: number) => {
    console.log(`Actividad ${id} completada`);
    // aquí podés hacer dispatch o API POST
  };

  const filtered = activities.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {showModal && <InterestModal onSubmit={() => setShowModal(false)} />}
      <SearchBar value={search} onChange={setSearch} />
      <div className="grid gap-4 md:grid-cols-3">
        {filtered.map((activity) => (
          <ActivityCard
            key={activity.id}
            {...activity}
            onComplete={() => handleComplete(activity.id)}
            disabled={false}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
