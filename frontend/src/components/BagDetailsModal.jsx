import { useState } from 'react';
import { FaTimes, FaHistory, FaSignInAlt, FaSignOutAlt, FaTrash, FaToggleOn } from 'react-icons/fa';
import { RegistroModal } from './RegistroModal';
import { useAuth } from '../context/AuthContext';

export function BagDetailsModal({ bag, onClose }) {
  const { user } = useAuth();
  const [isRegistroModalOpen, setIsRegistroModalOpen] = useState(false);
  const [tipoRegistro, setTipoRegistro] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegistro = (tipo) => {
    setTipoRegistro(tipo);
    setIsRegistroModalOpen(true);
  };

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta talega?')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/eaglebag/talegas/eliminar/${bag.bagCode}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Error al eliminar la talega');
      
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const newStatus = bag.status === 'Activo' ? 0 : 1;
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/talegas/actualizar/${bag.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ estado: newStatus })
      });

      if (!response.ok) throw new Error('Error al actualizar el estado');
      
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!bag) return null;

  const movementHistory = [
    { date: '2024-03-20', type: 'Entrada', location: 'Coche A-1' },
    { date: '2024-03-15', type: 'Salida', location: 'Nicho B-2' },
    { date: '2024-03-10', type: 'Entrada', location: 'Coche C-3' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#001937]">Detalles de la Talega</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-[#001937] transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Información Principal */}
          <div className="space-y-6">
            <img 
              src={bag.image} 
              alt={`Talega ${bag.bagCode}`}
              className="w-full h-64 object-cover rounded-lg shadow"
            />
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-[#001937] mb-4">Información General</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Código de Talega</span>
                  <p className="font-semibold text-[#001937]">{bag.bagCode}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Socio</span>
                  <p className="font-semibold text-[#001937]">{bag.socioName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Estado</span>
                  <span className={`inline-block px-2 py-1 rounded-full text-sm mt-1 ${
                    bag.status === 'Activo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {bag.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Historial y Detalles */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-[#001937] mb-4">Ubicación Actual</h3>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-[#001937]">{bag.location}</p>
                <p className="text-sm text-gray-600">Último movimiento: {bag.lastMovement}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="flex items-center gap-2 font-semibold text-lg text-[#001937] mb-4">
                <FaHistory className="text-[#FFC800]" />
                Historial de Movimientos
              </h3>
              <div className="space-y-4">
                {movementHistory.map((movement, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-[#001937]">{movement.type}</p>
                      <p className="text-sm text-gray-500">{movement.location}</p>
                    </div>
                    <span className="text-sm text-gray-500">{movement.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-[#001937] mb-4">Descripción</h3>
              <p className="text-gray-600">{bag.description}</p>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => handleRegistro('entrada')}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <FaSignInAlt className="mr-2" />
                Entrada
              </button>
              <button
                onClick={() => handleRegistro('salida')}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <FaSignOutAlt className="mr-2" />
                Salida
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          {user?.rol === 'admin' && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
              disabled={loading}
            >
              <FaTrash />
              Eliminar Talega
            </button>
          )}
          
          <button
            onClick={handleToggleStatus}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            disabled={loading}
          >
            <FaToggleOn />
            {bag.status === 'Activo' ? 'Desactivar' : 'Activar'} Talega
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cerrar
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-600">
            {error}
          </div>
        )}
      </div>

      {isRegistroModalOpen && (
        <RegistroModal
          isOpen={isRegistroModalOpen}
          onClose={() => setIsRegistroModalOpen(false)}
          talega={bag}
          tipo={tipoRegistro}
        />
      )}
    </div>
  );
} 