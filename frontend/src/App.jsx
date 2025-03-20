import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup' 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
    </Routes>
  )
}

export default App