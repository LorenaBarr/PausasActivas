// components/ActivityCard.tsx - Adaptado a tus tipos existentes
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { completeActivity } from '../features/activitySlice'
import { updateUserScore, addCompletedActivity } from '../features/authSlice'
import type { ActivityCardProps } from '../types/types'

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  onComplete, 
  isCompleted, 
  isRecommended, 
  canComplete 
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { completedToday } = useSelector((state: RootState) => state.activities)
  const { user } = useSelector((state: RootState) => state.auth)

  const handleComplete = () => {
    if (!canComplete || isCompleted || completedToday.includes(activity.id)) return

    // Calcular puntos según lógica del negocio
    const todayCount = completedToday.length
    const points = todayCount === 0 ? 4 : 6 // Primera: 4 puntos, Segunda: 6 puntos

    // Dispatch para completar actividad
    dispatch(completeActivity(activity.id))
    
    // Actualizar puntaje del usuario
    const newStreak = (user?.streak || 0) + (todayCount === 1 ? 1 : 0)
    dispatch(updateUserScore({ points, streak: newStreak }))
    
    // Agregar a actividades completadas
    dispatch(addCompletedActivity({ 
      activityId: activity.id, 
      points 
    }))
    
    // Callback para el componente padre
    onComplete(activity.id)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-700'
      case 'Medio': return 'bg-yellow-100 text-yellow-700'
      case 'Difícil': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
      isRecommended ? 'ring-2 ring-blue-200' : ''
    }`}>
      {/* Header con categoría y recomendado */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm text-blue-600 font-medium">
          {activity.category}
        </span>
        {isRecommended && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Recomendado
          </span>
        )}
      </div>
      
      {/* Título de la actividad */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {activity.name}
      </h3>
      
      {/* Dificultad y duración */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(activity.difficulty)}`}>
          {activity.difficulty}
        </span>
        <span className="text-xs text-gray-500">
          {activity.duration} min
        </span>
        <span className="text-xs text-gray-500">
          +{activity.points} pts
        </span>
      </div>
      
      {/* Imagen/Video */}
      {activity.imageUrl && (
        <div className="mb-4">
          <img 
            src={activity.imageUrl} 
            alt={activity.name}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      )}
      
      {activity.videoUrl && !activity.imageUrl && (
        <div className="mb-4">
          <video 
            className="w-full h-48 object-cover rounded-md"
            controls
            poster="/api/placeholder/400/200"
          >
            <source src={activity.videoUrl} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        </div>
      )}
      
      {/* Descripción */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {activity.description}
      </p>
      
      {/* Instrucciones (ocultas por defecto) */}
      <details className="mb-4">
        <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
          Ver instrucciones
        </summary>
        <p className="text-sm text-gray-600 mt-2 pl-4">
          {activity.instructions}
        </p>
      </details>
      
      {/* Botón de completar */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {completedToday.length}/2 completadas hoy
        </div>
        
        <button
          onClick={handleComplete}
          disabled={!canComplete || isCompleted}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isCompleted
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : !canComplete
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isCompleted 
            ? '✓ Completada' 
            : !canComplete 
            ? 'Límite alcanzado'
            : 'Completar'
          }
        </button>
      </div>
      
      {/* Indicador de puntos */}
      <div className="mt-2 text-xs text-center text-gray-500">
        {completedToday.length === 0 && '+4 puntos'}
        {completedToday.length === 1 && '+6 puntos (10 total por día completo)'}
      </div>
    </div>
  )
}

export default ActivityCard