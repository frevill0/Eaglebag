import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaHome, FaBoxes, FaUsers, FaGolfBall, FaBars, FaPlus, FaSearch } from 'react-icons/fa';
import { BagDetailsModal } from '../components/BagDetailsModal';
import productImage from '../assets/sets.jpg';
import { NewBagModal } from '../components/NewBagModal';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('todos');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isNewBagModalOpen, setIsNewBagModalOpen] = useState(false);
  const [selectedBag, setSelectedBag] = useState(null);
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { logout } = useAuth();

  const fetchBags = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/talegas/obtener`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar las talegas');
      }

      const data = await response.json();
      
      // Transformar los datos para que coincidan con el formato esperado
      const formattedBags = data.map(bag => ({
        id: bag.id_talega,
        bagCode: bag.id_talega,
        socioName: bag.socios?.nombres_completos || 'Sin nombre',
        socioCode: bag.codigo_socio,
        location: bag.ubicacion,
        status: bag.estado === 1 ? 'Activo' : 'Inactivo',
        image: bag.imagen_url || '/default-bag.png', // Asegúrate de tener una imagen por defecto
        descripcion: bag.descripcion,
        marca: bag.marca,
        tipo_talega: bag.tipo_talega,
        num_palos: bag.num_palos,
        tiene_toalla: bag.tiene_toalla,
        tiene_bolas: bag.tiene_bolas,
        tiene_guantes: bag.tiene_guantes,
        tiene_paraguas: bag.tiene_paraguas,
        socio: bag.socios
      }));

      setBags(formattedBags);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBags();
  }, []);

  const filteredBags = bags.filter(bag => {
    const matchesSearch = 
      bag.bagCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bag.socioName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bag.socioCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === 'todos' || 
      bag.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const matchesStatus = selectedStatus === 'todos' || 
      bag.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesLocation && matchesStatus;
  });

  const handleBagClick = (bag) => {
    setSelectedBag(bag);
    setIsDetailsModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
        {/* Barra lateral */}
        <aside className={`transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0 fixed md:static md:block w-64 p-6 border-r bg-[#F9F9F9] z-10 h-full`}>
          <h3 className="text-lg font-semibold mb-6 text-[#001937]">Filtros</h3>
          
          <div className="space-y-6">
            {/* Filtro por Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              >
                <option value="todos">Todas las ubicaciones</option>
                <option value="coche">Coches</option>
                <option value="nicho">Nichos</option>
              </select>
            </div>

            {/* Filtro por Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              >
                <option value="todos">Todos los estados</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            {/* Filtro por Fecha de Último Movimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Último Movimiento
              </label>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500">Desde</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Hasta</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#001937]">Dashboard</h2>
          </div>

          {/* Barra de búsqueda y botones */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <input
                type="search"
                placeholder="Buscar talega..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <button
              onClick={() => setIsNewBagModalOpen(true)}
              className="px-4 py-2 bg-[#FFC800] text-white rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800] transition flex items-center gap-2"
            >
              <FaPlus />
              Nueva Talega
            </button>
          </div>

          {/* Contenido del dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredBags.map((bag) => (
              <div
                key={bag.id}
                onClick={() => handleBagClick(bag)}
                className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={bag.image}
                  alt={`Talega ${bag.bagCode}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg text-[#001937]">{bag.bagCode}</h3>
                <p className="text-sm text-gray-600 mb-2">{bag.socioName}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{bag.location}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    bag.status === 'Activo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {bag.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      {isDetailsModalOpen && (
        <BagDetailsModal
          bag={selectedBag}
          onClose={() => {
            setIsDetailsModalOpen(false);
            fetchBags(); // Refrescar las talegas después de cerrar el modal
          }}
        />
      )}

      {isNewBagModalOpen && (
        <NewBagModal
          isOpen={isNewBagModalOpen}
          onClose={() => setIsNewBagModalOpen(false)}
          onBagCreated={() => {
            fetchBags(); // Refrescar las talegas después de crear una nueva
            setIsNewBagModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;