import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Trophy, Star, Calendar, Clock, Award, Settings, Edit } from 'lucide-react';
import { getUserAchievements } from '../services/api';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  points: number;
}

interface NotificationSettings {
  morningTime: string;
  afternoonTime: string;
  emailEnabled: boolean;
}

const ProfilePage: React.FC = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'settings'>('stats');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    morningTime: '09:00',
    afternoonTime: '15:00',
    emailEnabled: true
  });

  // Datos de ejemplo - en producción vendrían de la API
  const mockStats = {
    totalPoints: 32,
    currentStreak: 2,
    longestStreak: 2,
    totalActivities: 6,
    weeklyAverage: 3,
    monthlyGoal: 12,
    monthlyProgress: 5
  };


  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user?.id) return;
      setLoadingAchievements(true);
      try {
        const data = await getUserAchievements(user.id);
        setAchievements(data);
      } catch (error) {
        console.error('Error al cargar logros:', error);
      } finally {
        setLoadingAchievements(false);
      }
    };
    fetchAchievements();
  }, [user?.id]);


  const handleSaveNotifications = () => {
    alert('Configuración guardada exitosamente');
  };

  const earnedAchievements = achievements.filter(a => a.earned);
  const unlockedAchievements = achievements.filter(a => !a.earned);

  const getProgressPercentage = () => {
    return Math.min((mockStats.monthlyProgress / mockStats.monthlyGoal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header del perfil */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{user?.name || 'Usuario'}</h1>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{user?.email || 'usuario@ejemplo.com'}</p>
              
              {/* Estadísticas principales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{mockStats.totalPoints}</div>
                  <div className="text-sm text-gray-500">Puntos totales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{mockStats.currentStreak}</div>
                  <div className="text-sm text-gray-500">Racha actual</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{mockStats.totalActivities}</div>
                  <div className="text-sm text-gray-500">Actividades</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{earnedAchievements.length}</div>
                  <div className="text-sm text-gray-500">Logros</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'stats', label: 'Estadísticas', icon: Trophy },
              { id: 'achievements', label: 'Logros', icon: Award },
              { id: 'settings', label: 'Configuración', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Tab de Estadísticas */}
            {activeTab === 'stats' && (
              <div className="space-y-8">
                {/* Progreso mensual */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Progreso de este mes</h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Meta mensual</span>
                      <span className="text-sm font-medium text-gray-800">
                        {mockStats.monthlyProgress} / {mockStats.monthlyGoal} puntos
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage()}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {getProgressPercentage().toFixed(0)}% completado
                    </p>
                  </div>
                </div>

                {/* Estadísticas detalladas */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Estadísticas detalladas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 font-medium">Racha más larga</p>
                          <p className="text-3xl font-bold text-blue-800">{mockStats.longestStreak}</p>
                          <p className="text-sm text-blue-600">días consecutivos</p>
                        </div>
                        <Star className="w-8 h-8 text-blue-500" />
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 font-medium">Promedio semanal</p>
                          <p className="text-3xl font-bold text-green-800">{mockStats.weeklyAverage}</p>
                          <p className="text-sm text-green-600">actividades</p>
                        </div>
                        <Calendar className="w-8 h-8 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab de Logros */}
            {activeTab === 'achievements' && (
              <div className="space-y-8">
                {/* Logros obtenidos */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Logros obtenidos ({earnedAchievements.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {earnedAchievements.map(achievement => (
                      <div key={achievement.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{achievement.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-orange-600 font-medium">
                                +{achievement.points} puntos
                              </span>
                              <span className="text-xs text-gray-500">
                                {achievement.earnedDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logros por desbloquear */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Por desbloquear ({unlockedAchievements.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {unlockedAchievements.map(achievement => (
                      <div key={achievement.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6 opacity-75">
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl grayscale">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-600">{achievement.name}</h4>
                            <p className="text-sm text-gray-500 mb-2">{achievement.description}</p>
                            <span className="text-sm text-gray-400 font-medium">
                              +{achievement.points} puntos
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab de Configuración */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Notificaciones</h3>
                  <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Notificaciones por email</p>
                        <p className="text-sm text-gray-600">Recibe recordatorios de pausas activas</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailEnabled}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailEnabled: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Notificación matutina
                        </label>
                        <input
                          type="time"
                          value={notificationSettings.morningTime}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, morningTime: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Notificación vespertina
                        </label>
                        <input
                          type="time"
                          value={notificationSettings.afternoonTime}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, afternoonTime: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSaveNotifications}
                      className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Guardar configuración
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;