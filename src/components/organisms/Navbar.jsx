import './Navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  // Creamos un estado que dice si el menú está abierto (true) o cerrado (false)
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Función para alternar el estado
  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="barra-navegacion">
      {/*hacer clic, ejecuta toggleMenu */}
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
          <Link to="/login" className="btn-sesion">Iniciar Sesion</Link>
          <Link to="/registro" className="btn-registro">Registrarse</Link>
        </div>
        <button className="btn-carrito">🛒</button>
      </div>
    </header>
  );
}