import { useState } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

export function NewBagModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    socioCode: '',
    socioName: '',
    bagCode: '',
    description: '',
    location: '',
    image: null,
    accessories: []
  });

  const [newAccessory, setNewAccessory] = useState({
    name: '',
    quantity: 1,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAccessoryChange = (e) => {
    const { name, value } = e.target;
    setNewAccessory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addAccessory = () => {
    if (newAccessory.name.trim()) {
      setFormData(prev => ({
        ...prev,
        accessories: [...prev.accessories, { 
          ...newAccessory, 
          id: Date.now(),
          name: newAccessory.name.trim(),
          quantity: parseInt(newAccessory.quantity) || 1,
          description: newAccessory.description.trim()
        }]
      }));
      setNewAccessory({
        name: '',
        quantity: 1,
        description: ''
      });
    }
  };

  const removeAccessory = (id) => {
    setFormData(prev => ({
      ...prev,
      accessories: prev.accessories.filter(acc => acc.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#001937]">Registrar Nueva Talega</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-[#001937] transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código del Socio
              </label>
              <input
                type="text"
                name="socioCode"
                value={formData.socioCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                placeholder="Ej: SOC001"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Socio
              </label>
              <input
                type="text"
                name="socioName"
                value={formData.socioName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                placeholder="Nombre completo"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código de Talega
            </label>
            <input
              type="text"
              name="bagCode"
              value={formData.bagCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              placeholder="Ej: BAG001"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              required
            >
              <option value="">Seleccione ubicación</option>
              <option value="coche">Coche</option>
              <option value="nicho">Nicho</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              rows="3"
              placeholder="Descripción de la talega"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen de la Talega
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              required
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-[#001937] mb-4">Accesorios</h3>
            
            <div className="space-y-4">
              {formData.accessories.length > 0 && (
                <div className="space-y-2">
                  {formData.accessories.map((acc) => (
                    <div key={acc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-[#001937]">{acc.name}</p>
                        <p className="text-sm text-gray-500">
                          Cantidad: {acc.quantity}
                          {acc.description && ` - ${acc.description}`}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAccessory(acc.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Accesorio
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newAccessory.name}
                    onChange={handleAccessoryChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                    placeholder="Ej: Paraguas"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={newAccessory.quantity}
                    onChange={handleAccessoryChange}
                    min="1"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del Accesorio
                </label>
                <input
                  type="text"
                  name="description"
                  value={newAccessory.description}
                  onChange={handleAccessoryChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                  placeholder="Descripción breve del accesorio"
                />
              </div>

              <button
                type="button"
                onClick={addAccessory}
                disabled={!newAccessory.name.trim()}
                className={`w-full px-4 py-2 rounded-lg flex items-center justify-center space-x-2 
                  ${newAccessory.name.trim() 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
              >
                <FaPlus className="text-sm" />
                <span>Agregar Accesorio</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFC800] text-white rounded-lg hover:bg-[#e6b400]"
            >
              Registrar Talega
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 