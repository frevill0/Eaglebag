import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export function RegistroModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    tipo: 'entrada',
    codigoSocio: '',
    talega: '',
    observaciones: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar los datos
    console.log(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#001937]">Registro de Talega</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-[#001937]"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Registro
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código del Socio
            </label>
            <input
              type="text"
              name="codigoSocio"
              value={formData.codigoSocio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              placeholder="Ingrese el código del socio"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Talega
            </label>
            <input
              type="text"
              name="talega"
              value={formData.talega}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              placeholder="Ingrese el código de la talega"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              rows="3"
              placeholder="Ingrese cualquier observación relevante"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFC800] text-white rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800] transition"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroModal; 