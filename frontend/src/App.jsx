import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './pages/Login'
import Dashboard from './layout/Dashboard'
import Users from './pages/Users'
import Inventory from './pages/inventory'
import Register from './pages/Registro'
import Socios from './pages/Socios'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={<ProtectedRoute element={<Dashboard/>} />} />
          <Route path="dashboard/register" element={<ProtectedRoute element={<Register/>} />} />
          <Route 
            path="dashboard/users" 
            element={<ProtectedRoute element={<Users/>} requiredRole="admin" />} 
          />
          <Route path="dashboard/inventory" element={<ProtectedRoute element={<Inventory/>} />} />
          <Route path="dashboard/socios" element={<ProtectedRoute element={<Socios/>} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
