import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ModalContextProvider from './context/modalDisplayProvider'
import Register from './components/Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ModalContextProvider>
      <Register />
    </ModalContextProvider>
  )
}

export default App
