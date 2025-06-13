// pages/HomePage.tsx - Adaptado a tus tipos existentes
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { setRecommendedActivities, setActivities } from '../features/activitySlice'
import type { Activity } from '../types/types'
import ActivityCard from '../components/ActivityCard'
import Navbar from '../components/Navbar'

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { 
    recommendedActivities, 
    activities, 
    categories,
    completedToday,
    isLoading,
    searchTerm,
    selectedCategory
  } = useSelector((state: RootState) => state.activities)
  
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      // Datos mock que simulan tu API
      const mockActivities: Activity[] = [
        {
          id: '1',
          name: 'Estiramientos de Cuello',
          category: 'Pausas Activas Físicas',
          description: 'Movimientos suaves para relajar el cuello y hombros después de largas horas frente al computador.',
          instructions: '1. Inclina suavemente la cabeza hacia la derecha. 2. Mantén por 15 segundos. 3. Repite hacia la izquierda. 4. Realiza 3 repeticiones por lado.',
          videoUrl: 'https://ejemplo.com/video1.mp4',
          duration: 3,
          difficulty: 'Fácil',
          points: 4
        },
        {
          id: '2',
          name: 'Ejercicios de Brazos',
          category: 'Pausas Activas Físicas',
          description: 'Estiramientos específicos para brazos y muñecas que ayudan a prevenir lesiones por movimientos repetitivos.',
          instructions: '1. Extiende el brazo hacia adelante. 2. Con la otra mano, flexiona la muñeca hacia abajo. 3. Mantén 20 segundos. 4. Cambia de brazo.',
          imageUrl: '/api/placeholder/400/300',
          duration: 4,
          difficulty: 'Fácil',
          points: 4
        },
        {
          id: '3',
          name: 'Ejercicios Oculares',
          category: 'Pausas Activas Visuales',
          description: 'Movimientos de ojos diseñados para relajar la vista y reducir la fatiga visual.',
          instructions: '1. Mira hacia arriba por 5 segundos. 2. Mira hacia abajo por 5 segundos. 3. Mira a la izquierda y derecha. 4. Haz círculos con los ojos.',
          duration: 2,
          difficulty: 'Fácil',
          points: 3
        },
        {
          id: '4',
          name: 'Respiración Profunda',
          category: 'Pausas Activas Cognitivas',
          description: 'Técnicas de respiración consciente para reducir el estrés y mejorar la concentración.',
          instructions: '1. Inhala profundamente por 4 segundos. 2. Mantén el aire por 4 segundos. 3. Exhala lentamente por 6 segundos. 4. Repite 10 veces.',
          duration: 5,
          difficulty: 'Medio',
          points: 5
        },
        {
          id: '5',
          name: 'Meditación Rápida',
          category: 'Pausas Activas Cognitivas',
          description: 'Sesión corta de mindfulness para centrar la mente y reducir la ansiedad.',
          instructions: '1. Siéntate cómodamente. 2. Cierra los ojos. 3. Enfócate en tu respiración. 4. Cuando la mente divague, vuelve a la respiración.',
          duration: 5,
          difficulty: 'Medio',
          points: 5
        },
        {
          id: '6',
          name: 'Estiramiento de Espalda',
          category: 'Pausas Activas Ergonómicas',
          description: 'Ejercicios para aliviar la tensión en la espalda baja y mejorar la postura.',
          instructions: '1. De pie, entrelaza las manos sobre la cabeza. 2. Inclínate hacia un lado. 3. Mantén 15 segundos. 4. Repite hacia el otro lado.',
          duration: 4,
          difficulty: 'Fácil',
          points: 4
        }
      ]
      
      dispatch(setActivities(mockActivities))
      
      // Generar recomendaciones basadas en intereses del usuario
      const recommended = generateRecommendations(mockActivities, user?.interests || [])
      dispatch(setRecommendedActivities(recommended))
      
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const generateRecommendations = (allActivities: Activity[], userInterests: string[]): Activity[] => {
    // Si no hay intereses, mostrar actividades aleatorias
    if (userInterests.length === 0) {
      return allActivities.slice(0, 3)
    }
    
    // Filtrar por intereses del usuario
    const filteredActivities = allActivities.filter(
      (activity: Activity) => userInterests.includes(activity.category)
    )
    
    // Si no hay suficientes actividades filtradas, completar con otras
    const result = [...filteredActivities]
    if (result.length < 3) {
      const remaining = allActivities.filter(
        (activity: Activity) => !userInterests.includes(activity.category)
      )
      result.push(...remaining.slice(0, 3 - result.length))
    }
    
    // Mezclar y tomar 3
    return result.sort(() => Math.random() - 0.5).slice(0, 3)
  }

  const handleActivityComplete = (activityId: string) => {
    console.log(`Actividad ${activityId} completada`)
    // Aquí harías la llamada a tu API para registrar la actividad
  }

  const handleSearch = (term: string) => {
    // Implementar lógica de búsqueda
    console.log('Searching for:', term)
  }

  const handleCategoryFilter = (category: string) => {
    // Implementar lógica de filtro por categoría
    console.log('Filtering by category:', category)
  }

  // Filtrar actividades según búsqueda y categoría
  const getFilteredActivities = () => {
    let filtered = activities

    if (selectedCategory && selectedCategory !== '') {
      filtered = filtered.filter(activity => activity.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(activity => 
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  const filteredActivities = getFilteredActivities()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          categories={categories}
          selectedCategory={selectedCategory}
        />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Cargando actividades...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        categories={categories}
        selectedCategory={selectedCategory}
      />
      
      {/* Header con saludo */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ¡Hola {user?.nombre}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Es hora de una pausa activa para tu bienestar
              </p>
            </div>
            
            {/* Stats rápidas */}
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {user?.score || 0}
                </div>
                <div className="text-sm text-gray-500">Puntos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {user?.streak || 0}
                </div>
                <div className="text-sm text-gray-500">Racha</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {completedToday.length}/2
                </div>
                <div className="text-sm text-gray-500">Hoy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Actividades Recomendadas */}
        {recommendedActivities?.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Actividades Recomendadas para Ti
              </h2>
              <span className="text-sm text-gray-500">
                Basado en tus intereses
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedActivities.map((activity: Activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onComplete={handleActivityComplete}
                  isCompleted={completedToday.includes(activity.id)}
                  isRecommended={true}
                  canComplete={completedToday.length < 2}
                />
              ))}
            </div>
          </section>
        )}

        {/* Todas las Actividades */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory ? `Actividades: ${selectedCategory}` : 'Todas las Actividades'}
            </h2>
            <span className="text-sm text-gray-500">
            {filteredActivities?.length || 0} actividades {searchTerm && `para "${searchTerm}"`}

            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(filteredActivities || []).map((activity: Activity) => (
  <ActivityCard
    key={activity.id}
    activity={activity}
    onComplete={handleActivityComplete}
    isCompleted={completedToday.includes(activity.id)}
    isRecommended={false}
    canComplete={completedToday.length < 2}
  />
))}
          </div>
          
          {(filteredActivities?.length || 0) === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No se encontraron actividades {searchTerm && `para "${searchTerm}"`}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HomePage