import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    contrasena: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Efecto para limpiar los mensajes después de 3 segundos
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el inicio de sesión');
      }

      login(data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 300);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Columna izquierda - Formulario */}
      <div className="w-1/2 bg-[#e8f4e5] p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Mensajes de Error y Éxito */}
          <div className="h-16 mb-4">
            <div className={`transform transition-all duration-300 ease-out ${
              error || success ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}>
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md shadow-md">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}
              
              {success && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md shadow-md">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-sm font-medium">¡Iniciando sesión!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Título y subtítulo */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-extrabold text-[#1a3b34] flex items-center justify-center gap-2">
              <span role="img" aria-label="Golf Ball">⛳️</span>
              EagleBag
            </h1>
            <p className="text-sm text-gray-700">
              Sistema de inventarios de talegas del Quito Tenis & Golf Club
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="nombre_usuario">
                Nombre de Usuario
              </label>
              <input
                id="nombre_usuario"
                type="text"
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring focus:ring-[#1a3b34] focus:outline-none"
                placeholder="Ingrese su nombre de usuario"
                value={formData.nombre_usuario}
                onChange={(e) => setFormData({ ...formData, nombre_usuario: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="contrasena">
                Contraseña
              </label>
              <input
                id="contrasena"
                type="password"
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring focus:ring-[#1a3b34] focus:outline-none"
                placeholder="********"
                value={formData.contrasena}
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                required
              />
            </div>

            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-3/4 py-2 px-4 rounded-md bg-[#001F3F] text-white hover:bg-[#003366] text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                    <span>Ingresando...</span>
                  </div>
                ) : (
                  'Ingresar'
                )}
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-gray-500 mt-8">
            <p>© 2025 Quito Tenis & Golf Club. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>

      {/* Columna derecha - Logo */}
      <div className="w-1/2 bg-[#f7f7f7] flex flex-col items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center px-12">
          <img
            src={logo}
            alt="Quito Tenis & Golf Club"
            className="w-full max-w-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
