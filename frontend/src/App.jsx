import './App.css'
import { Routes,Route,Navigate } from 'react-router-dom'
import Login from './Pages/loginPage'
import RegisterPage from './Pages/registerPage'
import DashboardPage from './Pages/dashboardPage'
import { AuthProvider } from './context/AuthContext'

export default function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </AuthProvider>
  )
}