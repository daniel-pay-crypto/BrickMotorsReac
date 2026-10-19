import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
// Importaremos estas páginas cuando las creemos:
import { Productos } from './pages/Productos';
// import { Nosotros } from './pages/Nosotros';
import { DetalleBlog } from './pages/DetalleBlog';
import { Cherno } from './pages/Cherno';
import { Contacto } from './pages/Contacto';

function App() {
  return (
    <Routes>
      {/* Ruta principal */}
      <Route path="/" element={<Home />} />
      
      {/* Rutas futuras (las puedes descomentar a medida que las crees) */}
      <Route path="/productos" element={<Productos />} />
      {/* <Route path="/nosotros" element={<Nosotros />} /> */}

      <Route path="/admin" element={<Administracion />} />
      
      <Route path="/admin" element={<Administracion />} />

      <Route path="/blog/:id" element={<DetalleBlog />} />

      {/* Ruta para capturar errores (Página 404) */}
      <Route path="*" element={<h1 className="text-center mt-5 text-white">404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;