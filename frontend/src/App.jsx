import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Start from './pages/Start'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup' 
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding.jsx'
import CaptainLogout from './pages/CaptainLogout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path='/riding' element={<Riding/>}></Route>
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path='/captain-riding' element={<CaptainRiding/>}></Route>
      <Route path="/home" element={
        <UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>
      } />
      <Route path='/user/logout' element={
         <UserProtectedWrapper>
            <UserLogout/>
        </UserProtectedWrapper>
        } />
        <Route path='/captain-home' element={
             <CaptainProtectedWrapper>
              <CaptainHome/>
            </CaptainProtectedWrapper>
          
          } />
          <Route path='/captain-logout' element={
  <CaptainProtectedWrapper>
    <CaptainLogout />
  </CaptainProtectedWrapper>
} />
        
    </Routes>
  )
}

export default App