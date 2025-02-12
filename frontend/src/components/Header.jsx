import { FaBars, FaGolfBall, FaHome, FaBoxes, FaPlus, FaUsers, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Header({ setSidebarOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userRole = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')).rol : null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b p-4 flex justify-between items-center bg-white shadow">
      <div className="flex items-center space-x-3">
        <button onClick={() => setSidebarOpen(prev => !prev)} className="text-[#001937] hover:text-[#FFC800] md:hidden">
          <FaBars className="text-2xl" />
        </button>
        <FaGolfBall className="text-[#FFC800] text-2xl" />
        <span className="text-2xl font-bold text-[#001937]">Eaglebag</span>
      </div>

      <nav className="flex items-center space-x-8">
        <a href="/dashboard" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
          <FaHome className="text-lg" />
          <span>Inicio</span>
        </a>
        <a href="/dashboard/inventory" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
          <FaBoxes className="text-lg" />
          <span>Inventario</span>
        </a>
        <a href="/dashboard/register" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
          <FaPlus className="text-lg" />
          <span>Registrar</span>
        </a>
        {userRole?.toLowerCase() === 'admin' && (
          <a href="/dashboard/users" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
            <FaUsers className="text-lg" />
            <span>Usuarios</span>
          </a>
        )}
        <a href="/dashboard/socios" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
          <FaUser className="text-lg" />
          <span>Socios</span>
        </a>
      </nav>

      <button
        onClick={handleLogout}
        className="bg-[#FFC800] text-white px-4 py-2 rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800] transition"
      >
        Cerrar Sesión
      </button>
    </header>
  );
}

export default Header; 