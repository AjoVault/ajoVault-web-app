import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import Modal from './components/Modal/modal.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Register />
  </React.StrictMode>,
)
