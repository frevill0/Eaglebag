import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Login } from './pages/Login'
import Dashboard from './layout/Dashboard'
import Users from './pages/Users'
import Inventory from './pages/inventory'

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard/>}>
        </Route>
        <Route path="dashboard/users" element={<Users/>}></Route>
        <Route path="dashboard/inventory" element={<Inventory/>}></Route>
      </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
