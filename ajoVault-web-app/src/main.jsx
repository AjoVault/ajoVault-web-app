import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import Modal from './components/Modal/modal.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RegisterOutlet from './RegisterLayout.jsx'
import OTPModal from './components/Modal/OTPModal.jsx'
import EnterOTP from './components/Modal/EnterOTP.jsx'
import Password from './components/Modal/Password.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<RegisterOutlet />}>
      <Route path='/checkemail' element={<Modal />}  />
      <Route path='/otp' element={<OTPModal />} />
      <Route path='/inputotp' element={<EnterOTP />} />
      <Route path='/password' element={<Password />} />
    </Route>
    <Route path='/login' element={<Login />}>

    </Route>
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
