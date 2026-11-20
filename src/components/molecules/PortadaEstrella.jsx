import './PortadaEstrella.css';

export function PortadaEstrella() {
  return (
    <section className="estrella-portada" aria-labelledby="estrella-titulo">
      <div className="estrella-portada__mensaje">
        <span className="estrella-portada__capitulo">BRICK MOTORS PRESENTA · PROYECTO FAN</span>
        <h1 id="estrella-titulo">Estrella de la Muerte</h1>
        <div className="estrella-portada__creditos">
          <p className="estrella-portada__introduccion">
            Una estación espacial legendaria, imaginada pieza a pieza.
            Un desafío de construcción para conquistar la galaxia.
          </p>
        </div>
        <a className="estrella-portada__accion" href="#detalles-estrella">
          Descubrir la construcción <span aria-hidden="true">↓</span>
        </a>
        <span className="estrella-portada__nota">Concepto de exhibición · En desarrollo</span>
      </div>
      <div className="estrella-portada__escena">
        <div className="estrella-portada__halo" aria-hidden="true" />
        <div className="estrella-portada__orbita" aria-hidden="true" />
        <img
          className="estrella-portada__modelo"
          src="/img/estrella-muerte-lego.png"
          alt="Ilustración conceptual de la Estrella de la Muerte hecha con bloques"
          fetchPriority="high"
        />
        <span className="estrella-portada__indicador">MODELO CONCEPTUAL / 01</span>
      </div>
    </section>
  );
}
