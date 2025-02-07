import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash, FaSearch } from 'react-icons/fa';

export function NewBagModal({ isOpen, onClose, onBagCreated }) {
  const [formData, setFormData] = useState({
    codigo_socio: '',
    descripcion: '',
    marca: '',
    tipo_talega: '',
    num_palos: '',
    tiene_toalla: false,
    tiene_bolas: false,
    tiene_guantes: false,
    tiene_paraguas: false,
    imagen_url: '',
    ubicacion: ''
  });

  const [socios, setSocios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [showSociosList, setShowSociosList] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Cargar socios
  useEffect(() => {
    const fetchSocios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/socios/obtener`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setSocios(data);
      } catch (error) {
        console.error('Error al cargar socios:', error);
      }
    };

    if (isOpen) {
      fetchSocios();
    }
  }, [isOpen]);

  const handleSocioSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowSociosList(true);
  };

  const handleSocioSelect = (socio) => {
    setSelectedSocio(socio);
    setFormData(prev => ({
      ...prev,
      codigo_socio: socio.codigo_socio
    }));
    setShowSociosList(false);
    setSearchTerm(socio.nombres_completos);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Primero subir la imagen si existe
      let imagen_url = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/upload/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (!uploadResponse.ok) {
          throw new Error('Error al subir la imagen');
        }

        const uploadData = await uploadResponse.json();
        imagen_url = uploadData.url;
      }

      // Luego crear la talega con la URL de la imagen
      const talegaData = {
        ...formData,
        imagen_url
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/talegas/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(talegaData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la talega');
      }

      setSuccess(true);
      if (onBagCreated) onBagCreated();

      setTimeout(() => {
        setFormData({
          codigo_socio: '',
          descripcion: '',
          marca: '',
          tipo_talega: '',
          num_palos: '',
          tiene_toalla: false,
          tiene_bolas: false,
          tiene_guantes: false,
          tiene_paraguas: false,
          imagen_url: '',
          ubicacion: ''
        });
        setImageFile(null);
        setImagePreview('');
        setSelectedSocio(null);
        setSearchTerm('');
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

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">Talega creada exitosamente</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Búsqueda de socio */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Socio
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSocioSearch}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                placeholder="Buscar por nombre o código..."
                required
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {showSociosList && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                {socios
                  .filter(socio => 
                    socio.nombres_completos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    socio.codigo_socio?.toString().includes(searchTerm)
                  )
                  .map(socio => (
                    <div
                      key={socio.codigo_socio}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSocioSelect(socio)}
                    >
                      <p className="font-medium">{socio.nombres_completos}</p>
                      <p className="text-sm text-gray-600">Código: {socio.codigo_socio}</p>
                    </div>
                  ))}
                {socios.filter(socio => 
                  socio.nombres_completos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  socio.codigo_socio?.toString().includes(searchTerm)
                ).length === 0 && (
                  <div className="px-4 py-2 text-gray-500">
                    No se encontraron resultados
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen de la Talega
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca
              </label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                placeholder="Ej: Titleist"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Talega
            </label>
            <input
              type="text"
              name="tipo_talega"
              value={formData.tipo_talega}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              placeholder="Ej: Estándar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <select
              name="ubicacion"
              value={formData.ubicacion}
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
              Número de Palos
            </label>
            <input
              type="number"
              name="num_palos"
              value={formData.num_palos}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              rows="3"
              placeholder="Descripción de la talega"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#001937]">Accesorios</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="tiene_toalla"
                  checked={formData.tiene_toalla}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#FFC800] focus:ring-[#FFC800] border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Toalla</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="tiene_bolas"
                  checked={formData.tiene_bolas}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#FFC800] focus:ring-[#FFC800] border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Bolas</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="tiene_guantes"
                  checked={formData.tiene_guantes}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#FFC800] focus:ring-[#FFC800] border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Guantes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="tiene_paraguas"
                  checked={formData.tiene_paraguas}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#FFC800] focus:ring-[#FFC800] border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Paraguas</label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFC800] text-white rounded-lg hover:bg-[#e6b400]"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar Talega'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 