import { Link } from 'react-router-dom';
import { fichaEstrellaMuerte, fasesEstrellaMuerte } from '../../data/estrellaMuerte';
import './BitacoraEstrella.css';

/** Detalles técnicos separados de la portada para facilitar cambios y pruebas. */
export function BitacoraEstrella() {
  return (
    <section className="bitacora-estrella" id="detalles-estrella" aria-labelledby="bitacora-titulo">
      <div className="bitacora-estrella__encabezado">
        <span className="bitacora-estrella__sobrelinea">ARCHIVO IMPERIAL · REGISTRO DE CONSTRUCCIÓN</span>
        <h2 id="bitacora-titulo">De la idea a las piezas</h2>
        <p>
          ¿Cuántas piezas tendrá? ¿Cómo se construirá? Aquí reunimos los detalles
          conocidos y las etapas previstas de este proyecto conceptual.
        </p>
      </div>

      <div className="bitacora-estrella__contenedor">
        <aside className="bitacora-estrella__ficha" aria-labelledby="bitacora-ficha-titulo">
          <span className="bitacora-estrella__sobrelinea">DATOS DEL PROYECTO</span>
          <h3 id="bitacora-ficha-titulo">Ficha técnica</h3>
          <dl className="bitacora-estrella__datos">
            {fichaEstrellaMuerte.map((dato) => (
              <div className="bitacora-estrella__dato" key={dato.etiqueta}>
                <dt>{dato.etiqueta}</dt>
                <dd>
                  <strong>{dato.valor}</strong>
                  <small>{dato.detalle}</small>
                </dd>
              </div>
            ))}
          </dl>
          <p className="bitacora-estrella__aviso">
            La cantidad exacta de piezas, las dimensiones y la fecha de lanzamiento
            todavía no están confirmadas.
          </p>
        </aside>

        <div className="bitacora-estrella__proceso">
          <span className="bitacora-estrella__sobrelinea">HOJA DE RUTA PROPUESTA</span>
          <h3>Proceso de construcción</h3>
          <p className="bitacora-estrella__orientacion">Selecciona una fase para conocer su descripción.</p>
          <div className="bitacora-estrella__fases">
            {fasesEstrellaMuerte.map((fase) => (
              <details className="bitacora-estrella__fase" key={fase.numero}>
                <summary>
                  <span className="bitacora-estrella__numero">{fase.numero}</span>
                  <span className="bitacora-estrella__fase-cabecera">
                    <strong>{fase.titulo}</strong>
                    <small>{fase.resumen}</small>
                  </span>
                  <span className="bitacora-estrella__mas" aria-hidden="true">+</span>
                </summary>
                <p>{fase.descripcion}</p>
              </details>
            ))}
          </div>
          <Link className="bitacora-estrella__boton" to="/productos">
            Explorar la colección Star Wars <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
