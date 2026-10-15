import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';

import { Home } from './pages/Home';
import { Productos } from './pages/Productos';
import { Blog } from './pages/Blog';
// import { Nosotros } from './pages/Nosotros';



function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/blog" element={<Blog />} />
        {/* <Route path="/nosotros" element={<Nosotros />} /> */}

        {/* Ruta para capturar errores (Página 404) */}
        <Route path="*" element={<h1 className="text-center mt-5 text-white">404 - Página no encontrada</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;