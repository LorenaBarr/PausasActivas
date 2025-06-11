
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-700">Pausas Activas</h1>
      <div className="flex gap-4">
        <Link to="/" className="text-blue-700 hover:underline">
          Inicio
        </Link>
        <Link to="/profile" className="text-blue-700 hover:underline">
          Perfil
        </Link>
        <Link to="/history" className="text-blue-700 hover:underline">
          Historial
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
