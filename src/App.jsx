import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';

import  Home from './pages/Home';
import { Productos } from './pages/Productos';
import ProductDetail from './pages/ProductDetail';
import { Contacto } from './pages/Contacto';
import { DetalleBlog } from './pages/DetalleBlog';
import { Cherno } from './pages/Cherno';
import { Administracion } from './pages/Administracion';
import { Nosotros } from './pages/Nosotros';
import { Blog } from './pages/Blog';
import { Login } from './pages/Login';
import { Registro } from './pages/Registro';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cherno" element={<Cherno />} />
        <Route path="/admin" element={<Administracion />} />
        <Route path="/blog/:id" element={<DetalleBlog />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="*"
          element={<h1 className="text-center mt-5 text-white">404 - Página no encontrada</h1>}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;