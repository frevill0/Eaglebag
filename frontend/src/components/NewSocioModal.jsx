import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export function NewSocioModal({ isOpen, onClose, onSocioCreated }) {
  const [formData, setFormData] = useState({
    codigo_socio: '',
    nombres_completos: '',
    cedula: '',
    correo: '',
    telefono: '',
    direccion: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/socios/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.detalles) {
          const errorMessages = Object.entries(data.detalles)
            .map(([campo, mensaje]) => `${mensaje}`)
            .join('\n');
          throw new Error(errorMessages);
        } else {
          throw new Error(data.error || data.mensaje || 'Error al crear el socio');
        }
      }

      setSuccess(true);
      if (onSocioCreated) onSocioCreated();

      // Limpiar formulario y cerrar modal después de 2 segundos
      setTimeout(() => {
        setFormData({
          codigo_socio: '',
          nombres_completos: '',
          cedula: '',
          correo: '',
          telefono: '',
          direccion: ''
        });
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#001937]">Nuevo Socio</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-[#001937] transition-colors">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {error && (
          <div className="mx-4 mt-4 bg-red-50 border-l-4 border-red-500 p-3 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-1 text-sm text-red-700">
                  {error.split('\n').map((err, index) => (
                    <p key={index}>{err}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mx-4 mt-4 bg-green-50 border-l-4 border-green-500 p-3 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">¡Éxito!</h3>
                <p className="text-sm text-green-700">Socio creado exitosamente</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código de Socio
              </label>
              <input
                type="text"
                name="codigo_socio"
                value={formData.codigo_socio}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                required
                placeholder="Ej: 12345"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cédula
              </label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                required
                placeholder="Ej: 1712345678"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombres Completos
              </label>
              <input
                type="text"
                name="nombres_completos"
                value={formData.nombres_completos}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                required
                placeholder="Ej: Juan Pablo Pérez González"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                required
                placeholder="Ej: juan.perez@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                placeholder="Ej: 0991234567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                placeholder="Ej: Av. Principal"
              />
            </div>
          </div>

          <div className="border-t mt-6 pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#FFC800] text-white rounded-lg hover:bg-[#001937] transition-colors disabled:opacity-50 font-medium"
            >
              {loading ? 'Creando...' : 'Crear Socio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 