import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Login } from './pages/Login'
import Dashboard from './layout/Dashboard'
import Users from './pages/Users'
import Inventory from './pages/inventory'
import Register from './pages/Registro'
import Socios from './pages/Socios'
function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard/>}>
        </Route>
        <Route path="dashboard/register" element={<Register/>}></Route>
        <Route path="dashboard/users" element={<Users/>}></Route>
        <Route path="dashboard/inventory" element={<Inventory/>}></Route>
        <Route path="dashboard/socios" element={<Socios/>}></Route>
      </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
