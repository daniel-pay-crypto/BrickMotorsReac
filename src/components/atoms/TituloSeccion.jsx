import './TituloSeccion.css';

function TituloSeccion({ children, subtitulo }) {
  return (
    <div className="titulo-seccion">
      <h2 className="titulo-seccion__texto">{children}</h2>
      {subtitulo && <p className="titulo-seccion__subtitulo">{subtitulo}</p>}
    </div>
  );
}

export default TituloSeccion;
