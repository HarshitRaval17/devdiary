import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import AddLog from './pages/AddLog'
import Login from './pages/Login'
import Register from './pages/Register'
import Logs from './pages/Logs'
import Profile from './pages/Profile'
import Goals from './pages/Goals'

export default function App() 
{
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-log" element={<AddLog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/goals" element={<Goals />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}