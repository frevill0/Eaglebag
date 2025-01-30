import { useState, useMemo, useEffect } from 'react';
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { SocioTalegasModal } from '../components/SocioTalegasModal';
import { NewSocioModal } from '../components/NewSocioModal';
import { EditSocioModal } from '../components/EditSocioModal';
import Header from '../components/Header';

export function Socios() {
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [isNewSocioModalOpen, setIsNewSocioModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchSocios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/socios/obtener`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar los socios');
      }

      const data = await response.json();
      setSocios(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocios();
  }, []);

  const filteredSocios = useMemo(() => {
    return socios.filter((socio) =>
      socio.nombres_completos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      socio.codigo_socio?.toString().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, socios]);

  const handleViewTalegas = (socio) => {
    setSelectedSocio(socio);
    setIsModalOpen(true);
  };

  const handleEdit = (socio) => {
    setSelectedSocio(socio);
    setIsEditModalOpen(true);
  };

  const handleDelete = (socio) => {
    setSelectedSocio(socio);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/socios/eliminar/${selectedSocio.codigo_socio}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al eliminar socio');
      }

      setIsDeleteModalOpen(false);
      setSelectedSocio(null);
      fetchSocios();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC800]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Socios</h1>
              <p className="mt-1 text-sm text-gray-600">Administra los socios del club</p>
            </div>
            <button
              onClick={() => setIsNewSocioModalOpen(true)}
              className="bg-[#FFC800] text-white px-4 py-2 rounded-lg hover:bg-[#001937] transition-colors flex items-center space-x-2"
            >
              <FaPlus size={16} />
              <span>Nuevo Socio</span>
            </button>
          </div>

          <div className="mb-6">
            <div className="relative w-64">
              <input
                type="search"
                placeholder="Buscar socios..."
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-4">Cargando socios...</div>
          ) : error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-[#001937] text-white">
                  <th className="text-left py-4 px-6">Código</th>
                  <th className="text-left py-4 px-6">Nombre</th>
                  <th className="text-left py-4 px-6">Email</th>
                  <th className="text-left py-4 px-6">Teléfono</th>
                  <th className="text-center py-4 px-6">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSocios.map((socio, index) => (
                  <tr
                    key={socio.codigo_socio}
                    className={index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'}
                  >
                    <td className="py-4 px-6">{socio.codigo_socio}</td>
                    <td className="py-4 px-6">{socio.nombres_completos}</td>
                    <td className="py-4 px-6">{socio.correo}</td>
                    <td className="py-4 px-6">{socio.telefono || '-'}</td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => handleViewTalegas(socio)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Ver información"
                        >
                          <FaEye size={18} />
                        </button>
                        <button 
                          onClick={() => handleEdit(socio)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Editar socio"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(socio)}
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar socio"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <NewSocioModal
        isOpen={isNewSocioModalOpen}
        onClose={() => setIsNewSocioModalOpen(false)}
        onSocioCreated={fetchSocios}
      />

      <SocioTalegasModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSocio(null);
        }}
        socio={selectedSocio}
      />

      <EditSocioModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSocio(null);
        }}
        onSocioUpdated={fetchSocios}
        socio={selectedSocio}
      />

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirmar Eliminación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar al socio {selectedSocio?.nombres_completos}?
              Esta acción no se puede deshacer.
            </p>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedSocio(null);
                  setError(null);
                }}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Socios;