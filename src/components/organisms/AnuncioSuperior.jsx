import { useState } from 'react';
import { Link } from 'react-router-dom';
import Etiqueta from '../atoms/Etiqueta';
import './AnuncioSuperior.css';

export function AnuncioSuperior({
  mensaje = 'Nuevos sets Star Wars ya disponibles',
  enlace = '/productos',
  textoEnlace = 'Míralos aquí',
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="anuncio-superior">
      <Etiqueta variante="aviso">Nuevo</Etiqueta>
      <span className="anuncio-superior__texto">{mensaje}</span>
      <Link to={enlace} className="anuncio-superior__enlace">
        {textoEnlace}
      </Link>
      <button
        className="anuncio-superior__cerrar"
        onClick={() => setVisible(false)}
        aria-label="Cerrar anuncio"
      >
        ×
      </button>
    </div>
  );
}
