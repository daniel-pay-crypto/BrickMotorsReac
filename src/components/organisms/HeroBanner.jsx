import { Link } from 'react-router-dom';
import Etiqueta from '../atoms/Etiqueta';
import './HeroBanner.css';

export function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-contenido">
        <div className="etiquetas-hero">
          <Etiqueta variante="novedad">Novedad</Etiqueta>
          <Etiqueta variante="exclusivo">Exclusivos</Etiqueta>
        </div>
        <h1>Despliega el AT-AT SUPREMACY para dominar la batalla</h1>
        <p>Echa un vistazo a nuestro proyecto más imponente, con estructura reforzada Technic y Sistema de marcha completa. Listo para conquistar cualquier terreno y destruir a los rebeldes.</p>

        <div className="hero-botones">
          <a href="#productos" className="btn-primario">Comprar ahora &gt;</a>
          <Link to="/productos" className="btn-secundario">Ver todas las novedades &gt;</Link>
        </div>
      </div>
    </section>
  );
}
