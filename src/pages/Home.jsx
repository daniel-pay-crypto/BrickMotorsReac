import { Navbar } from '../components/organisms/Navbar';
import { HeroBanner } from '../components/organisms/HeroBanner';
import { Footer } from '../components/organisms/Footer';
import { Link } from 'react-router-dom';
import { SeccionProductos } from '../components/organisms/SeccionProductos';
export function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        <HeroBanner />
        
        <div className="fondo-oscuro">
          <h2 className="titulo-bienvenida">¡BIENVENIDO A NUESTRA TIENDA OFICIAL DE BRICK MOTORS!</h2>
          <div className="texto-bienvenida">
            <p>¡Aquí encontrarás todo lo necesario para romper los limites!</p>
            <p>Explora nuestro catálogo exclusivo de Legos Tecnicos, Modelos MOC y Descubre nuestro nuevo Proyecto, solo en Brick Motors.</p>
          </div>
        </div>

        <div className="seccion-cherno">
          <h2 className="titulo-cherno">¡Dale un vistazo a nuestro próximo proyecto!</h2>
          <div className="contenedor-cherno">
            <div className="cherno-imagen">
              <Link to="/cherno">
                <img src="/img/chernolink.jpg" alt="Proyecto Cherno Alpha" />
              </Link>
            </div>
            <div className="cherno-texto">
              <p>El nuevo proyecto ambicioso de Brick Motors ya esta en camino. 5,000 piezas de algo... increible.</p>
              <p>Pura Ingeniería Technic al mas alto nivel.</p>
            </div>
          </div>
        </div>

        <div className="seccion-animada">
          <h2>¡Explora Nuestros Productos!</h2>
          <img src="/img/at-st.png" className="imagen-deslizable derecha" alt="caminante AT-ST" />
        </div>

        <SeccionProductos />

        <div className="seccion-animada2">
          <h2>¡Cruza la galaxia persiguiendo a los ultimos jedis que quedan!</h2>
          <img src="/img/stardestroyer.png" className="imagen-deslizable izquierda" alt="Destructor Estelar" />
          <h2>¿Te atreves?</h2>
        </div>
      </main>
      <Footer />
    </>
  );
}