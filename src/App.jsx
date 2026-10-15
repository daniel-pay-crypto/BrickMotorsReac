import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
// Importaremos estas páginas cuando las creemos:
import { Productos } from './pages/Productos';
// import { Nosotros } from './pages/Nosotros';
import { Cherno } from './pages/Cherno';

function App() {
  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<Home />} />
      
      {/* Rutas futuras (las puedes descomentar a medida que las crees) */}
      <Route path="/productos" element={<Productos />} />
      {/* <Route path="/nosotros" element={<Nosotros />} /> */}
      <Route path="/cherno" element={<Cherno />} />

      <Route path="/admin" element={<Administracion />} />
      
      <Route path="/admin" element={<Administracion />} />

      
      {/* Ruta para capturar errores (Página 404) */}
      <Route path="*" element={<h1 className="text-center mt-5 text-white">404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;