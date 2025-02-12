import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, requiredRole }) => {
  const { token } = useAuth();
  const userRole = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')).rol : null;

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requiredRole && userRole?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/dashboard" />;
  }

  return Component;
};

export default ProtectedRoute; 