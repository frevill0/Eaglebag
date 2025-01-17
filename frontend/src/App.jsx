import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Login } from './pages/Login'
import Dashboard from './layout/Dashboard'
import Users from './pages/Users'

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard/>}>
        </Route>
        <Route path="dashboard/users" element={<Users/>}></Route>
      </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
