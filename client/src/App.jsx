import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Screens/Login'
import Register from './components/Screens/Register'
import ResetPass from './components/Screens/ResetPass'
import ForgetPass from './components/Screens/ForgetPass'
import Home from './components/Screens/Home'
function App() {
  
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* <Route path='/' element={<Home></Home>}></Route> */}
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/resetpass' element={<ResetPass />}></Route>
          <Route path='/forgetpass' element={<ForgetPass />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
