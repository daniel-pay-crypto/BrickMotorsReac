import './Navbar.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSesion } from '../../context/SesionContext';
import { useCarrito } from '../../context/CarritoContext';

export function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { usuario, cerrarSesion } = useSesion();
  const { cantidadTotal, abrirPanel } = useCarrito();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const salir = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <header className="barra-navegacion">
      <button className="btn-hamburguesa" onClick={toggleMenu} aria-label="Abrir menú">
        ☰
      </button>

      <nav className={`menu-enlaces ${menuAbierto ? 'activo' : ''}`} id="menu">
        <Link to="/" onClick={cerrarMenu}>Inicio</Link>
        <Link to="/productos" onClick={cerrarMenu}>Productos</Link>
        <Link to="/nosotros" onClick={cerrarMenu}>Nosotros</Link>
        <Link to="/blog" onClick={cerrarMenu}>Blog</Link>
        <Link to="/contacto" onClick={cerrarMenu}>Contacto</Link>
        <Link to="/cherno" onClick={cerrarMenu}>Cherno</Link>
      </nav>

      <div className="nav-derecha">
        <div className="botones-sesion">
          {usuario ? (
            <>
              <span className="saludo-usuario">Hola, {usuario.nombre.split(' ')[0]}</span>
              {usuario.esAdmin && (
                <Link to="/admin" className="btn-registro">Panel Admin</Link>
              )}
              <button className="btn-sesion" onClick={salir}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-sesion">Iniciar Sesion</Link>
              <Link to="/registro" className="btn-registro">Registrarse</Link>
            </>
          )}
        </div>
        <button className="btn-carrito" onClick={abrirPanel} aria-label="Abrir carrito">
          🛒
          {cantidadTotal > 0 && <span className="contador-carrito">{cantidadTotal}</span>}
        </button>
      </div>
    </header>
  );
}
