import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export function NewUserModal({ isOpen, onClose, onUserCreated }) {
  const [formData, setFormData] = useState({
    codigo_colaborador: '',
    nombre_usuario: '',
    correo: '',
    contrasena: '',
    confirmPassword: '',
    rol: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (formData.contrasena !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay sesión activa. Por favor, inicie sesión nuevamente.');
      }

      const userData = {
        codigo_colaborador: formData.codigo_colaborador,
        nombre_usuario: formData.nombre_usuario,
        correo: formData.correo.toLowerCase(),
        contrasena: formData.contrasena,
        rol: formData.rol
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.mensaje || 'Error al crear usuario');
      }

      setSuccess(true);
      if (onUserCreated) onUserCreated();
      
      setTimeout(() => {
        onClose();
        setFormData({
          codigo_colaborador: '',
          nombre_usuario: '',
          correo: '',
          contrasena: '',
          confirmPassword: '',
          rol: ''
        });
        setSuccess(false);
      }, 2000);

    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#001937]">Nuevo Usuario</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-[#001937] transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">¡Éxito!</h3>
                <p className="text-sm text-green-700 mt-1">Usuario creado exitosamente</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código de Colaborador
            </label>
            <input
              type="text"
              name="codigo_colaborador"
              value={formData.codigo_colaborador}
              onChange={handleChange}
              placeholder="Ej: 1234"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              placeholder="Ingrese el nombre de usuario"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="ejemplo@qtgc.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="ADMIN">Administrador</option>
              <option value="OPERADOR">Operador</option>
              <option value="CONSULTOR">Consultor</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFC800] text-white rounded-lg hover:bg-[#001937] hover:text-[#FFC800] transition-colors"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 