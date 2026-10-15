export function ImpactoCherno() {
  return (
    <section className="seccion-impacto">
      <h2 className="titulo-impacto">¿Problemas con FullStack?</h2>
      
      <div className="escenario-pelea" id="escenario-pelea">
        <img src="/img/kaiju.png" alt="Kaiju recibiendo golpe" className="luchador kaiju" />
        <img src="/img/chernoboxeo.png" alt="Puñetazo de Cherno Alpha" className="luchador cherno-punch" />
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
          <h2>¡APLASTA A LOS SETS DE LEGO DE TUS AMIGOS CON CHERNO ALPHA Y DEJA QUE ESOS 5 KILOS DE INGENIERÍA PURA DE LEGO TECHNIC LOS HAGAN PEDAZOS!</h2>
          <p>¿¿Qué esperas??</p>
        </div>
      </div>
    </section>
  );
}