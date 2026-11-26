import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AnuncioSuperior } from './components/organisms/AnuncioSuperior';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';
import { CarritoDesplegable } from './components/organisms/CarritoDesplegable';
import { RutaAdmin } from './components/organisms/RutaAdmin';
import { useCarrito } from './hooks/useCarrito';
import { useSesion } from './hooks/useSesion';

import { Pedidos } from './pages/Pedidos';
import Home from './pages/Home';
import { Productos } from './pages/Productos';
import ProductDetail from './pages/ProductDetail';
import { Contacto } from './pages/Contacto';
import { DetalleBlog } from './pages/DetalleBlog';
import { Cherno } from './pages/Cherno';
import { EstrellaMuerte } from './pages/EstrellaMuerte';
import { Administracion } from './pages/Administracion';
import { Nosotros } from './pages/Nosotros';
import { Blog } from './pages/Blog';
import { Login } from './pages/Login';
import { Registro } from './pages/Registro';

function App() {
  const sesion = useSesion();
  const carrito = useCarrito(sesion.usuario?.id);
  const navigate = useNavigate();

  return (
    <>
      <AnuncioSuperior />
      <Navbar
        usuario={sesion.usuario}
        onCerrarSesion={sesion.cerrarSesion}
        cantidadCarrito={carrito.totalItems}
        onAbrirCarrito={carrito.abrirCarrito}
      />
      {sesion.error && <p role="alert">{sesion.error}</p>}
      <CarritoDesplegable
        mensaje={carrito.mensaje}
        ocupado={carrito.ocupado}
        onFinalizarCompra={sesion.usuario ? carrito.confirmar : () => { carrito.cerrarCarrito(); navigate('/login'); }}
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
        <Route path="/products/:id" element={<ProductDetail agregarAlCarrito={carrito.agregar} />} />
        <Route path="/pedidos" element={sesion.cargando ? <p>Cargando sesión…</p> : sesion.usuario ? <Pedidos usuario={sesion.usuario} /> : <Navigate to="/login" replace />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cherno" element={<Cherno />} />
        <Route path="/estrella-de-la-muerte" element={<EstrellaMuerte />} />
        <Route
          path="/admin"
          element={
            sesion.cargando ? <p>Cargando sesión…</p> : <RutaAdmin usuario={sesion.usuario}>
              <Administracion usuario={sesion.usuario} onCerrarSesion={sesion.cerrarSesion} />
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
