import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaUser, FaHome, FaBoxes, FaUsers, FaGolfBall, FaBars, FaPlus, FaFilter, FaSearch, FaCalendar } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import { RegistroModal } from '../components/RegistroModal';
import Header from '../components/Header';

export function Register() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('todos');
  
  const [logs] = useState([
    { id: 1, action: 'Entrada', bag: 'Talega 001', timestamp: '2025-01-20 10:00:00', socio: 'Juan Pérez', ubicacion: 'A-123' },
    { id: 2, action: 'Salida', bag: 'Talega 002', timestamp: '2025-01-20 12:00:00', socio: 'María García', ubicacion: 'B-456' },
    { id: 3, action: 'Entrada', bag: 'Talega 003', timestamp: '2025-01-20 14:00:00', socio: 'Carlos López', ubicacion: 'C-789' },
    { id: 4, action: 'Salida', bag: 'Talega 004', timestamp: '2025-01-20 16:00:00', socio: 'Ana Martínez', ubicacion: 'D-012' },
  ]);

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Acción', key: 'action' },
    { label: 'Talega', key: 'bag' },
    { label: 'Socio', key: 'socio' },
    { label: 'Ubicación', key: 'ubicacion' },
    { label: 'Fecha y Hora', key: 'timestamp' },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.bag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.socio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'todos' || log.action.toLowerCase() === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
        {/* Filtros laterales */}
        <aside className={`transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0 fixed md:static md:block w-64 p-6 border-r bg-[#F9F9F9] z-10 h-full`}>
          <h3 className="text-lg font-semibold mb-6 text-[#001937]">Filtros</h3>
          
          <div className="space-y-6">
            {/* Filtro por tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Registro</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              >
                <option value="todos">Todos</option>
                <option value="entrada">Entradas</option>
                <option value="salida">Salidas</option>
              </select>
            </div>

            {/* Filtro por fecha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rango de Fechas</label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-8">
          <div className="max-w-screen-xl w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#001937]">Logs de Entradas y Salidas</h2>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden bg-[#FFC800] text-white p-2 rounded-lg"
              >
                <FaFilter />
              </button>
            </div>

            {/* Barra de búsqueda y botones */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-96">
                <input
                  type="search"
                  placeholder="Buscar por talega, socio o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-[#FFC800] text-white rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800] transition flex items-center gap-2"
                >
                  <FaPlus />
                  Nuevo Registro
                </button>
                <CSVLink
                  data={filteredLogs}
                  headers={headers}
                  filename={"logs_talegas.csv"}
                  className="px-4 py-2 bg-[#FFC800] text-white rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800] transition flex items-center gap-2"
                >
                  Exportar
                </CSVLink>
              </div>
            </div>

            {/* Tabla mejorada */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead className="bg-[#001937] text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Acción</th>
                    <th className="px-6 py-3 text-left">Talega</th>
                    <th className="px-6 py-3 text-left">Socio</th>
                    <th className="px-6 py-3 text-left">Ubicación</th>
                    <th className="px-6 py-3 text-left">Fecha y Hora</th>
                    <th className="px-6 py-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, index) => (
                    <tr
                      key={log.id}
                      className={index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'}
                    >
                      <td className="px-6 py-4 border-b">{log.id}</td>
                      <td className="px-6 py-4 border-b">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          log.action === 'Entrada' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b">{log.bag}</td>
                      <td className="px-6 py-4 border-b">{log.socio}</td>
                      <td className="px-6 py-4 border-b">{log.ubicacion}</td>
                      <td className="px-6 py-4 border-b">{log.timestamp}</td>
                      <td className="px-6 py-4 border-b">
                        <button className="text-blue-600 hover:text-blue-800">
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <RegistroModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Pie de página */}
      <footer className="border-t p-4 bg-white text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <p>© 2025 Quito Tenis & Golf Club. Todos los derechos reservados.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-[#001937]">Ayuda</a>
            <a href="#" className="hover:text-[#001937]">Soporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Register;
