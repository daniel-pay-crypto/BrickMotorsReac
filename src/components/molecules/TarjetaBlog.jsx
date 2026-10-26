import './TarjetaBlog.css';
import { Link } from 'react-router-dom';

export function TarjetaBlog({ id, imagen, alt, titulo, descripcion }) {
  return (
    <Link to={`/blog/${id}`} className="tarjeta-blog">
      <img src={imagen} alt={alt} className="img-blog" />
      <div className="contenido-tarjeta">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
        <span className="btn-leer-mas">Leer transmisión completa</span>
      </div>
    </Link>
  );
}
