import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';
import { PanelCarrito } from './components/organisms/PanelCarrito';
import { RutaAdmin } from './components/organisms/RutaAdmin';
import { useCarrito } from './hooks/useCarrito';
import { useSesion } from './hooks/useSesion';

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
  const carrito = useCarrito();
  const sesion = useSesion();

  return (
    <>
      <Navbar
        usuario={sesion.usuario}
        onCerrarSesion={sesion.cerrarSesion}
        cantidadCarrito={carrito.totalItems}
        onAbrirCarrito={carrito.abrirCarrito}
      />
      <PanelCarrito
        abierto={carrito.abierto}
        items={carrito.items}
        totalItems={carrito.totalItems}
        totalPrecio={carrito.totalPrecio}
        onCerrar={carrito.cerrarCarrito}
        onCambiarCantidad={carrito.cambiarCantidad}
        onAumentar={carrito.aumentar}
        onReducir={carrito.reducir}
        onEliminar={carrito.eliminar}
        onVaciar={carrito.vaciar}
      />
      <Routes>
        <Route path="/" element={<Home agregarAlCarrito={carrito.agregar} />} />
        <Route path="/productos" element={<Productos agregarAlCarrito={carrito.agregar} />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cherno" element={<Cherno />} />
        <Route
          path="/admin"
          element={
            <RutaAdmin usuario={sesion.usuario}>
              <Administracion onCerrarSesion={sesion.cerrarSesion} />
            </RutaAdmin>
          }
        />
        <Route path="/blog/:id" element={<DetalleBlog />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login onIniciarSesion={sesion.iniciarSesion} />} />
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