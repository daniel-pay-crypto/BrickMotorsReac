import './Home.css';
import { HeroBanner } from '../components/organisms/HeroBanner';
import { Link } from 'react-router-dom';
import { SeccionProyectos } from '../components/organisms/SeccionProyectos';
import { SeccionProductos } from '../components/organisms/SeccionProductos';
import { SeccionBeneficios } from '../components/organisms/SeccionBeneficios';

export default function Home({ agregarAlCarrito }) {
  return (
    <>
      <main>
        <HeroBanner />

        <div className="fondo-oscuro">
          <h2 className="titulo-bienvenida">¡BIENVENIDO A NUESTRA TIENDA OFICIAL DE BRICK MOTORS!</h2>
          <div className="texto-bienvenida">
            <p>¡Aquí encontrarás todo lo necesario para romper los limites!</p>
            <p>Explora nuestro catálogo exclusivo de Legos Tecnicos, Modelos MOC y Descubre nuestro nuevo Proyecto, solo en Brick Motors.</p>
          </div>
        </div>

        <SeccionBeneficios />

        <SeccionProyectos />

        <div className="seccion-animada">
          <h2>¡Explora Nuestros Productos!</h2>
          <img src="/img/at-st.png" className="imagen-deslizable derecha" alt="caminante AT-ST" />
        </div>

        <SeccionProductos onAgregar={agregarAlCarrito} />

        <section className="seccion-galaxia" aria-labelledby="titulo-galaxia">
          <div className="seccion-galaxia__contenido">
            <span>COLECCIÓN STAR WARS</span>
            <h2 id="titulo-galaxia">¿Te atreves a conquistar la galaxia?</h2>
            <p>
              Construye tu propia flota, persigue a los últimos Jedi y lleva
              el poder del Imperio a tu colección.
            </p>
            <Link to="/productos" className="seccion-galaxia__boton">
              Descubrir la colección ↗
            </Link>
          </div>
          <img
            src="/img/stardestroyer.png"
            alt="Destructor Estelar de Star Wars"
            className="seccion-galaxia__nave"
            loading="lazy"
          />
        </section>
      </main>
    </>
  );
}