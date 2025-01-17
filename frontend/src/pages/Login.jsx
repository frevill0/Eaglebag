import { useState } from 'react';
import { Link, Navigate} from 'react-router-dom';
import logo from '../assets/logo.jpg';

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex">
      {/* Columna izquierda - Formulario */}
      <div className="w-1/2 bg-[#e8f4e5] p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-[#1a3b34]">
              BIENVENIDO A EAGLEBAG
            </h1>
            <p className="text-sm text-gray-600">
              Sistema de inventarios de talegas del Quito Tenis & Golf Club
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-200"
                placeholder="Ingrese su correo"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-200"
                placeholder="********"
              />
            </div>

            <Link
              to='/dashboard'
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-[#001F3F] text-white hover:bg-[#003366]"
            >
              Ingresar
            </Link>
          </form>
        </div>
      </div>

      {/* Columna derecha - Logo */}
      <div className="w-1/2 bg-[#f5f5f5] flex flex-col items-center justify-center">
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

