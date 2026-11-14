import { Link } from 'react-router-dom';
import './Logo.css';

function Logo({ claro = false, mostrarTexto = true }) {
  return (
    <Link
      to="/"
      className={`logo-marca ${claro ? 'logo-marca--claro' : ''}`.trim()}
      aria-label="Brick Motors, ir al inicio"
    >
      <span className="logo-ladrillo" aria-hidden="true" />
      {mostrarTexto && (
        <span className="logo-texto">
          Brick<span className="logo-texto-acento">Motors</span>
        </span>
      )}
    </Link>
  );
}

export default Logo;
