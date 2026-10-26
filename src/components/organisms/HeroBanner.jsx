import { Link } from 'react-router-dom';
import './HeroBanner.css';
export function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-contenido">
        <div className="etiquetas-hero">
          <span className="etiqueta">Novedad</span>
          <span className="etiqueta etiqueta-exclusivo">Exclusivos</span>
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