import { Link } from 'react-router-dom';
import './TarjetaProyecto.css';

export function TarjetaProyecto({ proyecto }) {
  return (
    <article className={`tarjeta-proyecto tarjeta-proyecto--${proyecto.tema}`}>
      <Link
        to={proyecto.ruta}
        className="tarjeta-proyecto__visual"
        aria-label={`Ver proyecto ${proyecto.titulo}`}
      >
        <img src={proyecto.imagen} alt={proyecto.imagenAlt} loading="lazy" />
      </Link>
      <div className="tarjeta-proyecto__texto">
        <span className="tarjeta-proyecto__etiqueta">{proyecto.etiqueta}</span>
        <h3>{proyecto.titulo}</h3>
        <p className="tarjeta-proyecto__subtitulo">{proyecto.subtitulo}</p>
        <p className="tarjeta-proyecto__descripcion">{proyecto.descripcion}</p>
        <ul className="tarjeta-proyecto__caracteristicas">
          {proyecto.detalles.map((detalle) => <li key={detalle}>{detalle}</li>)}
        </ul>
        <Link className="tarjeta-proyecto__boton" to={proyecto.ruta}>
          {proyecto.llamada} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
