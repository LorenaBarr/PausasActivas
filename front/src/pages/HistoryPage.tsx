import React, { useState } from 'react';
import { Calendar, Clock, Trophy, Filter, ChevronDown } from 'lucide-react';
import dayjs from 'dayjs';

interface HistoryEntry {
  id: string;
  activityName: string;
  category: string;
  completedAt: string;
  points: number;
  duration: string;
}

const HistoryPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const mockHistory: HistoryEntry[] = [
    {
      id: '1',
      activityName: 'Estiramiento de cuello y hombros',
      category: 'pausas-fisicas',
      completedAt: '2024-06-12T10:30:00Z',
      points: 4,
      duration: '5 min'
    },
    {
      id: '2',
      activityName: 'Ejercicios oculares 20-20-20',
      category: 'pausas-visuales',
      completedAt: '2024-06-12T15:45:00Z',
      points: 3,
      duration: '2 min'
    },
    {
      id: '3',
      activityName: 'Respiración consciente',
      category: 'pausas-cognitivas',
      completedAt: '2024-06-11T11:15:00Z',
      points: 5,
      duration: '10 min'
    },
    {
      id: '4',
      activityName: 'Corrección de postura',
      category: 'pausas-ergonomicas',
      completedAt: '2024-06-11T16:20:00Z',
      points: 4,
      duration: '7 min'
    },

  ];

  const categories = [
    { id: 'all', name: 'Todas las categorías' },
    { id: 'pausas-fisicas', name: 'Pausas físicas' },
    { id: 'pausas-visuales', name: 'Pausas visuales' },
    { id: 'pausas-cognitivas', name: 'Pausas cognitivas' },
    { id: 'pausas-recreativas', name: 'Pausas recreativas' },
    { id: 'pausas-ergonomicas', name: 'Pausas ergonómicas' }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'pausas-fisicas': 'bg-green-100 text-green-800',
      'pausas-visuales': 'bg-blue-100 text-blue-800',
      'pausas-cognitivas': 'bg-purple-100 text-purple-800',
      'pausas-recreativas': 'bg-orange-100 text-orange-800',
      'pausas-ergonomicas': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = dayjs(dateString);
    const now = dayjs();
    
    if (date.isSame(now, 'day')) {
      return `Hoy, ${date.format('HH:mm')}`;
    } else if (date.isSame(now.subtract(1, 'day'), 'day')) {
      return `Ayer, ${date.format('HH:mm')}`;
    } else if (date.isSame(now, 'week')) {
      return date.format('dddd, HH:mm');
    } else {
      return date.format('DD/MM/YYYY, HH:mm');
    }
  };

  const filterHistory = () => {
    let filtered = mockHistory;
    const now = dayjs();

    // Filtrar por fecha
    switch (selectedFilter) {
      case 'today':
        filtered = filtered.filter(entry => dayjs(entry.completedAt).isSame(now, 'day'));
        break;
      case 'week':
        filtered = filtered.filter(entry => dayjs(entry.completedAt).isSame(now, 'week'));
        break;
      case 'month':
        filtered = filtered.filter(entry => dayjs(entry.completedAt).isSame(now, 'month'));
        break;
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(entry => entry.category === selectedCategory);
    }

    return filtered.sort((a, b) => dayjs(b.completedAt).unix() - dayjs(a.completedAt).unix());
  };

  const getStats = () => {
    const filtered = filterHistory();
    const totalPoints = filtered.reduce((sum, entry) => sum + entry.points, 0);
    const totalActivities = filtered.length;
    const totalDuration = filtered.reduce((sum, entry) => {
      const minutes = parseInt(entry.duration.replace(' min', ''));
      return sum + minutes;
    }, 0);

    return { totalPoints, totalActivities, totalDuration };
  };

  const groupByDate = (entries: HistoryEntry[]) => {
    const grouped: { [key: string]: HistoryEntry[] } = {};
    
    entries.forEach(entry => {
      const date = dayjs(entry.completedAt).format('YYYY-MM-DD');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(entry);
    });

    return grouped;
  };

  const filteredHistory = filterHistory();
  const stats = getStats();
  const groupedHistory = groupByDate(filteredHistory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Historial de actividades</h1>
          <p className="text-gray-600">Revisa tu progreso y actividades completadas</p>
        </div>

        {/* Estadísticas del período seleccionado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Puntos obtenidos</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalPoints}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Actividades completadas</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalActivities}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Tiempo total</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalDuration} min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center text-gray-600"
            >
              <Filter className="w-5 h-5 mr-2" />
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className={`space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            {/* Filtro por fecha */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Período</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Todo' },
                  { id: 'today', label: 'Hoy' },
                  { id: 'week', label: 'Esta semana' },
                  { id: 'month', label: 'Este mes' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por categoría */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Categoría</p>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de actividades */}
        <div className="space-y-6">
          {Object.keys(groupedHistory).length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No hay actividades</h3>
              <p className="text-gray-600">No se encontraron actividades para los filtros seleccionados.</p>
            </div>
          ) : (
            Object.keys(groupedHistory).map(date => (
              <div key={date} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b">
                  <h3 className="font-semibold text-gray-800">
                    {dayjs(date).isSame(dayjs(), 'day') 
                      ? 'Hoy' 
                      : dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
                      ? 'Ayer'
                      : dayjs(date).format('DD/MM/YYYY')
                    }
                  </h3>
                  <p className="text-sm text-gray-600">
                    {groupedHistory[date].length} actividad{groupedHistory[date].length !== 1 ? 'es' : ''}
                  </p>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {groupedHistory[date].map(entry => (
                    <div key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-800">{entry.activityName}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(entry.category)}`}>
                              {entry.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatDate(entry.completedAt)}
                            </span>
                            <span>Duración: {entry.duration}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">+{entry.points}</div>
                          <div className="text-sm text-gray-500">puntos</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;