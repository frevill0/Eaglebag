import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { token } = useAuth();

  return token ? Component : <Navigate to="/" />;
};

export default ProtectedRoute; 