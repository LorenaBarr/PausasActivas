

const ProfilePage = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Mi perfil</h2>
      <p><strong>Puntaje total:</strong> 124 puntos</p>
      <p><strong>Logros:</strong></p>
      <ul className="list-disc ml-6">
        <li>🔥 Semana perfecta</li>
        <li>🎖 ¡Imparable! (5 días seguidos)</li>
      </ul>
    </div>
  );
};

export default ProfilePage;
