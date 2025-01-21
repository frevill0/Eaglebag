import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaUser, FaHome, FaBoxes, FaUsers, FaGolfBall, FaBars, FaPlus } from 'react-icons/fa';
import { CSVLink } from 'react-csv';

export function Register() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logs] = useState([
    { id: 1, action: 'Entrada', bag: 'Talega 001', timestamp: '2025-01-20 10:00:00' },
    { id: 2, action: 'Salida', bag: 'Talega 002', timestamp: '2025-01-20 12:00:00' },
    { id: 3, action: 'Entrada', bag: 'Talega 003', timestamp: '2025-01-20 14:00:00' },
    { id: 4, action: 'Salida', bag: 'Talega 004', timestamp: '2025-01-20 16:00:00' },
  ]);

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Acción', key: 'action' },
    { label: 'Talega', key: 'bag' },
    { label: 'Fecha y Hora', key: 'timestamp' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Encabezado */}
      <header className="border-b p-4 flex justify-between items-center bg-white shadow">
        <div className="flex items-center space-x-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#001937] hover:text-[#FFC800] md:hidden">
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
          <a href="/dashboard/users" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
            <FaUsers className="text-lg" />
            <span>Usuarios</span>
          </a>
        </nav>

        <button onClick={() => navigate('/')} className="p-2 text-[#001937] hover:text-[#FFC800]">
          <FaUser className="text-xl" />
        </button>
      </header>

      <div className="flex flex-1">
        {/* Contenido principal */}
        <main className="flex-1 p-8 flex flex-col justify-center">
          <div className="max-w-screen-xl w-full mx-auto">
            <h2 className="text-2xl font-bold text-[#001937] mb-6">Logs de Entradas y Salidas</h2>

            <div className="mb-4 flex justify-end">
              <CSVLink
                data={logs}
                headers={headers}
                filename={"logs_talegas.csv"}
                className="px-4 py-2 bg-[#FFC800] text-white rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800] transition"
              >
                Exportar a Excel
              </CSVLink>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border shadow-md">
                <thead className="bg-[#001937] text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Acción</th>
                    <th className="px-6 py-3 text-left">Talega</th>
                    <th className="px-6 py-3 text-left">Fecha y Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr
                      key={log.id}
                      className={index % 2 === 0 ? 'bg-[#F9F9F9] text-[#001937]' : 'bg-white text-[#001937]'}
                    >
                      <td className="px-6 py-4 border-b">{log.id}</td>
                      <td className="px-6 py-4 border-b">{log.action}</td>
                      <td className="px-6 py-4 border-b">{log.bag}</td>
                      <td className="px-6 py-4 border-b">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

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
