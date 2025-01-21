import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';  

export function Login() {
  const [formData, setFormData] = useState({
    username: '', 
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex">
      {/* Columna izquierda - Formulario */}
      <div className="w-1/2 bg-[#e8f4e5] p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-10">
          {/* Título y subtítulo */}
          <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-[#1a3b34] flex items-center justify-center gap-2">
            <span role="img" aria-label="Golf Ball">
              ⛳️
            </span>
            EagleBag
          </h1>
            <p className="text-sm text-gray-700">
              Sistema de inventarios de talegas del Quito Tenis & Golf Club
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Usuario */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                Usuario
              </label>
              <input
                id="username"
                type="text" // Cambiado de email a text
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring focus:ring-[#1a3b34] focus:outline-none"
                placeholder="Ingrese su nombre de usuario"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            {/* Campo Password */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring focus:ring-[#1a3b34] focus:outline-none"
                placeholder="********"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* Botón de ingreso */}
            <div className="pt-6 flex justify-center">
              <Link
                to='/dashboard' // Enlace de redirección
                className="w-3/4 py-2 px-4 rounded-md bg-[#001F3F] text-white hover:bg-[#003366] text-center flex items-center justify-center gap-2"
              >
                Ingresar
              </Link>
            </div>
          </form>

          {/* Pie de página */}
          <div className="text-center text-xs text-gray-500">
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
