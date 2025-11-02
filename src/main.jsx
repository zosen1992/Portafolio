import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // 👈 IMPORTA ESTO

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Presentacion"> {/* 👈 ENVUELVE TU APP AQUÍ */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
