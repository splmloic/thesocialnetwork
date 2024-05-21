import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profil from './pages/Profil'
import Navbar from './components/Navbar'

function App() {
  return (
    <main className=''>
      <BrowserRouter>
      <Navbar/>
      <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profil/:userSlug" element={<Profil/>}/>
      </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
