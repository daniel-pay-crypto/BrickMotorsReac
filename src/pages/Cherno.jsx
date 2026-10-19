import './Cherno.css';
import { Navbar } from '../components/organisms/Navbar';
import { Footer } from '../components/organisms/Footer';
import { useAnimarAlVer } from '../hooks/useAnimarAlVer';

export function Cherno() {
  const escenarioRef = useAnimarAlVer(0.3);

  return (
    <>
      <Navbar />

      <main>
        <section className="hero-video-container">
          <video autoPlay loop muted playsInline className="video-fondo">
            <source src="/videos/Cherno1.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>

          <div className="hero-contenido">
            <span className="etiqueta-novedad">PRÓXIMAMENTE</span>
            <h1>Despliega a CHERNO ALPHA para defender la costa</h1>
            <p>
              Echa un vistazo a nuestro proximo proyecto más imponente, con
              estructura reforzada. ¡El último de los Mark-1 está listo para la
              batalla!.
            </p>
          </div>
        </section>

        <section className="seccion-info-robot">
          <div className="contenedor-columnas">
            <div className="columna-imagen">
              <img src="/img/chernodescripcion.png" alt="Cherno Alpha Mark-1" />
            </div>

            <div className="columna-texto">
              <h2>El pináculo de la ingeniería pesada</h2>
              <p>
                Preparado para soportar los impactos más devastadores,{' '}
                <strong>Cherno Alpha</strong> es el modelo Mark-1 más robusto
                jamás diseñado por Brick Motors.
              </p>
              <p>
                Muy pronto podrás ensamblar cada pistón, engranaje y el
                emblemático reactor nuclear de esta brutal bestia de combate.
                Diseñado exclusivamente para los constructores más
                experimentados.
              </p>

              <ul className="datos-tecnicos">
                <li><strong>🔧 Piezas estimadas:</strong> +5,000</li>
                <li><strong>⚙️ Dificultad:</strong> Maestro Constructor</li>
                <li><strong>📅 Lanzamiento:</strong> Invierno 2027</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="seccion-impacto">
          <h2 className="titulo-impacto">¿Problemas con FullStack?</h2>

          <div className="escenario-pelea" ref={escenarioRef}>
            <img
              src="/img/kaiju.png"
              alt="Kaiju recibiendo golpe"
              className="luchador kaiju"
            />
            <img
              src="/img/chernoboxeo.png"
              alt="Puñetazo de Cherno Alpha"
              className="luchador cherno-punch"
            />
          </div>
          <h3 className="subtitulo-impacto">¡CHERNO ALPHA LOS ENFRENTA POR TI!</h3>

          <div className="contenedor-video-destruccion">
            <div className="columna-video">
              <video autoPlay loop muted playsInline className="video-pelea">
                <source src="/videos/chernopelea.mp4" type="video/mp4" />
                El navegador no soporta videos HTML5.
              </video>
            </div>

            <div className="columna-texto-llamativo">
              <h2>
                ¡APLASTA A LOS SETS DE LEGO DE TUS AMIGOS CON CHERNO ALPHA Y
                DEJA QUE ESOS 5 KILOS DE INGENIERÍA PURA DE LEGO TECHNIC LOS
                HAGAN PEDAZOS!
              </h2>
              <p>¿¿Qué esperas??</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
