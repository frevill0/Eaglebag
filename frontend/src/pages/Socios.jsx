import { useState, useMemo } from 'react';
import { FaPlus, FaSearch, FaEye, FaBars, FaGolfBall, FaHome, FaBoxes, FaUsers, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SocioTalegasModal } from '../components/SocioTalegasModal';
import { NewSocioModal } from '../components/NewSocioModal';
import Header from '../components/Header';

// Datos de socios (pueden venir de una API en el futuro)
const initialSocios = [
  {
    id: 1,
    codigo: 'SOC001',
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '0991234567',
    talegas: [
      { id: 1, codigo: 'TAL001', estado: 'Activo', ubicacion: 'Coche A-1' },
      { id: 2, codigo: 'TAL002', estado: 'Inactivo', ubicacion: 'Nicho B-2' },
    ],
  },
  {
    id: 2,
    codigo: 'SOC002',
    nombre: 'María García',
    email: 'maria@example.com',
    telefono: '0992345678',
    talegas: [{ id: 3, codigo: 'TAL003', estado: 'Activo', ubicacion: 'Nicho C-3' }],
  },
  {
    id: 3,
    codigo: 'SOC003',
    nombre: 'Carlos López',
    email: 'carlos@example.com',
    telefono: '0993456789',
    talegas: [
      { id: 4, codigo: 'TAL004', estado: 'Activo', ubicacion: 'Coche B-1' },
      { id: 5, codigo: 'TAL005', estado: 'Activo', ubicacion: 'Coche B-2' },
    ],
  },
  {
    id: 4,
    codigo: 'SOC004',
    nombre: 'Ana Martínez',
    email: 'ana@example.com',
    telefono: '0994567890',
    talegas: [{ id: 6, codigo: 'TAL006', estado: 'Inactivo', ubicacion: 'Nicho A-1' }],
  },
  {
    id: 5,
    codigo: 'SOC005',
    nombre: 'Luis Torres',
    email: 'luis@example.com',
    telefono: '0995678901',
    talegas: [
      { id: 7, codigo: 'TAL007', estado: 'Activo', ubicacion: 'Coche D-1' },
      { id: 8, codigo: 'TAL008', estado: 'Activo', ubicacion: 'Nicho D-2' },
    ],
  },
];

export function Socios() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [isNewSocioModalOpen, setIsNewSocioModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar socios en tiempo real
  const filteredSocios = useMemo(() => {
    return initialSocios.filter((socio) =>
      socio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      socio.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleViewTalegas = (socio) => {
    setSelectedSocio(socio);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#001937]">Socios</h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <div className="relative w-full md:w-64">
                  <input
                    type="search"
                    placeholder="Buscar socios..."
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:border-transparent focus:outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  onClick={() => setIsNewSocioModalOpen(true)}
                  className="w-full md:w-auto bg-[#FFC800] text-white px-6 py-2 rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800] flex items-center justify-center space-x-2 transition-all"
                >
                  <FaPlus />
                  <span>Añadir Nuevo Socio</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#001937] text-white">
                      <th className="px-6 py-4 text-left">Código</th>
                      <th className="px-6 py-4 text-left">Nombre</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Teléfono</th>
                      <th className="px-6 py-4 text-left">Talegas</th>
                      <th className="px-6 py-4 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSocios.map((socio) => (
                      <tr key={socio.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">{socio.codigo}</td>
                        <td className="px-6 py-4">{socio.nombre}</td>
                        <td className="px-6 py-4">{socio.email}</td>
                        <td className="px-6 py-4">{socio.telefono}</td>
                        <td className="px-6 py-4">{socio.talegas.length}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewTalegas(socio)}
                            className="text-[#FFC800] hover:text-[#001937] transition-colors"
                          >
                            <FaEye className="text-xl" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewSocioModal
        isOpen={isNewSocioModalOpen}
        onClose={() => setIsNewSocioModalOpen(false)}
      />

      <SocioTalegasModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSocio(null);
        }}
        socio={selectedSocio}
      />

      {/* Footer */}
      <footer className="border-t p-4 bg-white text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <p>© 2025 Quito Tenis & Golf Club. Todos los derechos reservados.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-[#001937] transition-colors">Ayuda</a>
            <a href="#" className="hover:text-[#001937] transition-colors">Soporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Socios;