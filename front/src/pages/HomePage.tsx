import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { setRecommendedActivities, setActivities, setCompletedToday } from '../features/activitySlice'
import { resetUserScore } from '../features/authSlice'
import type { Activity } from '../types/types'
import ActivityCard from '../components/ActivityCard'
import Navbar from '../components/Navbar'
import { getActivities } from '../services/api'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  useEffect(() => {
    loadInitialData()
  }, [])

  const handleResetCompleted = () => {
    dispatch(setCompletedToday([]))
  }
  const handleResetScoreAndStreak = () => {
    dispatch(resetUserScore())
  }


  const loadInitialData = async () => {
    try {
      if (!user?.id) {
        console.error('Usuario no disponible');
        return;
      }
      const activitiesData = await getActivities(user.id);
      dispatch(setActivities(activitiesData));

      const recommended = generateRecommendations(activitiesData, user?.interests || []);
      dispatch(setRecommendedActivities(recommended));

    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const generateRecommendations = (allActivities: Activity[], userInterests: string[]): Activity[] => {
    if (userInterests.length === 0) {
      return allActivities.slice(0, 3)
    }

    const filteredActivities = allActivities.filter(
      (activity: Activity) => userInterests.includes(activity.category)
    )

    const result = [...filteredActivities]
    if (result.length < 3) {
      const remaining = allActivities.filter(
        (activity: Activity) => !userInterests.includes(activity.category)
      )
      result.push(...remaining.slice(0, 3 - result.length))
    }

    return result.sort(() => Math.random() - 0.5).slice(0, 3)
  }

  const handleActivityComplete = (activityId: string) => {
    console.log(`Actividad ${activityId} completada`)
  }

  const handleSearch = (term: string) => {
    console.log('Searching for:', term)
  }

  const handleCategoryFilter = (category: string) => {
    console.log('Filtering by category:', category)
  }

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

            <div className="flex space-x-6">
              <button
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-semibold"
                onClick={() => navigate('/profile')}
                type="button"
              >
                Perfil
              </button>
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