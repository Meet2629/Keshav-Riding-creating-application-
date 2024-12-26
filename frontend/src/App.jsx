//import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CapatainSignup from './pages/CapatainSignup';
// import { UserDataContext } from './context/UserContext';
// import { useContext } from 'react';

const App = () =>{

  return (
    <div>
      <Routes>
          <Route path='/' element={<Home/> }/>
          <Route path='/login' element={<UserLogin/> }/>
          <Route path='/signup' element={<UserSignup/> }/>
          <Route path='/captain-login' element={<CaptainLogin/> }/>
          <Route path='/captain-signup' element={<CapatainSignup/> }/>
      </Routes>
    </div>
  )
} 

export default App
