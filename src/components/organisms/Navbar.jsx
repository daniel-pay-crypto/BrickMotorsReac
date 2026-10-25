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

  return (
    <header className="barra-navegacion">
      {/* Al hacer clic, ejecuta toggleMenu */}
      <button className="btn-hamburguesa" onClick={toggleMenu}>
        ☰
      </button>
      
      <nav className={`menu-enlaces ${menuAbierto ? 'activo' : ''}`} id="menu">
        <Link to="/" onClick={toggleMenu}>Inicio</Link>
        <Link to="/productos" onClick={toggleMenu}>Productos</Link>
        <Link to="/nosotros" onClick={toggleMenu}>Nosotros</Link>
        <Link to="/blog" onClick={toggleMenu}>Blog</Link>
        <Link to="/contacto" onClick={toggleMenu}>Contacto</Link>
        <Link to="/cherno" onClick={toggleMenu}>Cherno</Link>
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