import { Link } from 'react-router-dom';

export function ArticuloBlog({ articulo }) {
  return (
    <main className="contenedor-detalle-blog">
      <Link to="/blog" className="btn-volver">← Volver al Blog</Link>

      <article className="articulo-completo">
        <h1 className="titulo-articulo">{articulo.titulo}</h1>
        <p className="fecha-articulo">{articulo.fecha}</p>

        <img src={articulo.imagen} alt={articulo.alt} className="img-destacada" />

        <div className="texto-articulo">
          {articulo.contenido.map((bloque, index) =>
            bloque.tipo === 'h2'
              ? <h2 key={index}>{bloque.texto}</h2>
              : <p key={index}>{bloque.texto}</p>
          )}
        </div>
      </article>
    </main>
  );
}