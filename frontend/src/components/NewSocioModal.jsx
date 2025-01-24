import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export function NewSocioModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    email: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nuevo socio:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#001937]">Nuevo Socio</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-[#001937] transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código del Socio
            </label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              placeholder="Ej: SOC001"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              placeholder="Nombre y Apellidos"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              placeholder="correo@ejemplo.com"
              required
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
              className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              placeholder="Ej: 0991234567"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 border rounded-lg text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#FFC800] text-white rounded-lg hover:bg-[#e6b400] text-sm"
            >
              Crear Socio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 