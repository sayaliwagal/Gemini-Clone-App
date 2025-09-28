import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './Pages/Login.jsx';
import Dashbord from './Pages/Dashbord.jsx';
import { ToastContainer } from 'react-toastify';
import VerifyOtp from './Pages/VerifyOtp.jsx';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/dashbord" element={<Dashbord/>} />
      </Routes>
      <ToastContainer position='top-right' autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
