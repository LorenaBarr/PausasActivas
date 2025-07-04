import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { completeActivity } from '../features/activitySlice'
import { updateUserScore, addCompletedActivity } from '../features/authSlice'
import type { ActivityCardProps } from '../types/types'


function getYouTubeId(url: string): string | undefined {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : undefined;
}

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

  const [localCompleted, setLocalCompleted] = React.useState(isCompleted)

  React.useEffect(() => {
    setLocalCompleted(isCompleted)
  }, [isCompleted])

  const handleComplete = () => {
    if (!canComplete || localCompleted || completedToday.includes(activity.id)) return

    const points = activity.points

    dispatch(completeActivity(activity.id))
    
    const todayCount = completedToday.length
    const newStreak = (user?.streak || 0) + (todayCount === 1 ? 1 : 0)
    dispatch(updateUserScore({ points, streak: newStreak }))
    
    dispatch(addCompletedActivity({ 
      activityId: activity.id, 
      points 
    }))
    
    onComplete(activity.id)

    setLocalCompleted(true)
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
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {activity.name}
      </h3>
      
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
    {activity.videoUrl.includes('youtube.com') || activity.videoUrl.includes('youtu.be') ? (
      <iframe
        width="100%"
        height="220"
        src={`https://www.youtube.com/embed/${getYouTubeId(activity.videoUrl)}`}
        title={activity.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-56 rounded-md"
      />
    ) : (
      <video 
        className="w-full h-48 object-cover rounded-md"
        controls
        poster="/api/placeholder/400/200"
      >
        <source src={activity.videoUrl} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
    )}
  </div>
)}
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {activity.description}
      </p>
      
      <details className="mb-4">
        <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
          Ver instrucciones
        </summary>
        <p className="text-sm text-gray-600 mt-2 pl-4">
          {activity.instructions}
        </p>
      </details>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {completedToday.length}/2 completadas hoy
        </div>
        
        <button
          onClick={handleComplete}
          disabled={!canComplete || localCompleted}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            localCompleted
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : !canComplete
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {localCompleted 
            ? '✓ Completada' 
            : 'Aceptar'
          }
        </button>
      </div>
      
      <div className="mt-2 text-xs text-center text-gray-500">
        +{activity.points} puntos
      </div>
    </div>
  )
}

export default ActivityCard