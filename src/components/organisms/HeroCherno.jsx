export function HeroCherno() {
  return (
    <section className="hero-video-container">
      <video autoPlay loop muted playsInline className="video-fondo">
        <source src="/videos/Cherno1.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <div className="hero-contenido">
        <span className="etiqueta-novedad">PRÓXIMAMENTE</span>
        <h1>Despliega a CHERNO ALPHA para defender la costa</h1>
        <p>Echa un vistazo a nuestro proximo proyecto más imponente, con estructura reforzada. ¡El último de los Mark-1 está listo para la batalla!.</p>
      </div>
    </section>
  );
}