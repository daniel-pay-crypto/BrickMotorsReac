
import { Link } from 'react-router-dom';

export function TarjetaBlog({ id, imagen, alt, titulo, descripcion }) {
  return (
    // La ruta apuntará al detalle del blog usando el ID
    <Link to={`/detalle-blog/${id}`} className="tarjeta-blog">
      <img src={imagen} alt={alt} className="img-blog" />
      <div className="contenido-tarjeta">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
        <span className="btn-leer-mas">Leer transmisión completa</span>
      </div>
    </Link>
  );
}