import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profil from './pages/Profil'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profil/:username" element={<Profil/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
