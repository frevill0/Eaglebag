import { useState } from 'react';
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
  const [selectedBag, setSelectedBag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewBagModalOpen, setIsNewBagModalOpen] = useState(false);

  const { logout } = useAuth();

  const [bags] = useState([
    {
      id: 1,
      bagCode: 'BAG001',
      socioCode: '001',
      socioName: 'Juan Pérez',
      status: 'Activo',
      location: 'Coche A-1',
      lastMovement: '2024-03-20',
      description: 'Talega negra con logo QTGC',
      image: productImage
    },
    {
      id: 2,
      bagCode: 'BAG002',
      socioCode: '002',
      socioName: 'María García',
      status: 'Activo',
      location: 'Nicho B-3',
      lastMovement: '2024-03-19',
      description: 'Talega azul marca Titleist',
      image: productImage
    },
    {
      id: 3,
      bagCode: 'BAG003',
      socioCode: '003',
      socioName: 'Carlos López',
      status: 'Inactivo',
      location: 'Coche C-2',
      lastMovement: '2024-03-18',
      description: 'Talega roja con ruedas',
      image: productImage
    },
    {
      id: 4,
      bagCode: 'BAG004',
      socioCode: '004',
      socioName: 'Ana Martínez',
      status: 'Activo',
      location: 'Nicho A-4',
      lastMovement: '2024-03-17',
      description: 'Talega blanca marca Callaway',
      image: productImage
    },
    {
      id: 5,
      bagCode: 'BAG005',
      socioCode: '005',
      socioName: 'Roberto Sánchez',
      status: 'Activo',
      location: 'Coche B-1',
      lastMovement: '2024-03-16',
      description: 'Talega verde con compartimentos',
      image: productImage
    },
    {
      id: 6,
      bagCode: 'BAG006',
      socioCode: '006',
      socioName: 'Laura Torres',
      status: 'Inactivo',
      location: 'Nicho D-2',
      lastMovement: '2024-03-15',
      description: 'Talega gris marca Ping',
      image: productImage
    },
    {
      id: 7,
      bagCode: 'BAG007',
      socioCode: '007',
      socioName: 'Diego Ramírez',
      status: 'Activo',
      location: 'Coche A-3',
      lastMovement: '2024-03-14',
      description: 'Talega negra con porta paraguas',
      image: productImage
    },
    {
      id: 8,
      bagCode: 'BAG008',
      socioCode: '008',
      socioName: 'Carmen Ruiz',
      status: 'Activo',
      location: 'Nicho C-1',
      lastMovement: '2024-03-13',
      description: 'Talega morada marca TaylorMade',
      image: productImage
    },
    {
      id: 9,
      bagCode: 'BAG009',
      socioCode: '009',
      socioName: 'Pablo Morales',
      status: 'Inactivo',
      location: 'Coche D-4',
      lastMovement: '2024-03-12',
      description: 'Talega amarilla con bolsillos laterales',
      image: productImage
    },
    {
      id: 10,
      bagCode: 'BAG010',
      socioCode: '010',
      socioName: 'Isabel Castro',
      status: 'Activo',
      location: 'Nicho B-2',
      lastMovement: '2024-03-11',
      description: 'Talega naranja marca Cobra',
      image: productImage
    },
    {
      id: 11,
      bagCode: 'BAG011',
      socioCode: '011',
      socioName: 'Fernando Silva',
      status: 'Activo',
      location: 'Coche C-3',
      lastMovement: '2024-03-10',
      description: 'Talega café con detalles dorados',
      image: productImage
    },
    {
      id: 12,
      bagCode: 'BAG012',
      socioCode: '012',
      socioName: 'Patricia Vega',
      status: 'Inactivo',
      location: 'Nicho A-2',
      lastMovement: '2024-03-09',
      description: 'Talega rosa marca Wilson',
      image: productImage
    }
  ]);

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
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
      {isModalOpen && (
        <BagDetailsModal
          bag={selectedBag}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;