import './App.css'
import Presentacion from './Componentes/Presentacion';
import { Routes, Route } from "react-router-dom"; 


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Presentacion />} />
      </Routes>
    </div>
  )
}

export default App
