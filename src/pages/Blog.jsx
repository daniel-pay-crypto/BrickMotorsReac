import './Blog.css';
import { TarjetaBlog } from '../components/molecules/TarjetaBlog';

export function Blog() {
  const publicaciones = [
    {
      id: 1,
      imagen: "/img/at-st.png",
      alt: "Nuevos sets Star Wars",
      titulo: "Los Nuevos Sets Star Wars Ya Están Disponibles",
      descripcion: "Reforzamos el catálogo con diez sets nuevos, desde packs de combate hasta el Caza TIE y Ala-X Fusionados. Revisa qué llegó a la tienda."
    },
    {
      id: 2,
      imagen: "/img/Fotoat1.jpeg",
      alt: "Armado de MOC Technic",
      titulo: "Detrás de Cámaras: Armando Nuestro Primer MOC Technic",
      descripcion: "Te mostramos cómo nació el primer modelo original de Brick Motors, pieza por pieza, motor por motor."
    },

    {
      id: 3,
      imagen: "/img/halconmilenario.png",
      alt: "Halcón Milenario",
      titulo: "El Halcón Milenario Aterriza en Brick Motors",
      descripcion: "La nave más rápida de la galaxia ya tiene su lugar en nuestra vitrina. Conoce los detalles de este modelo destacado."
    }
  ];

  return (
    <main className="contenedor-blog">
      <h1 className="titulo-blog">Transmisiones desde Brick Motors</h1>

      <div className="grid-blogs">
        {publicaciones.map((post) => (
          <TarjetaBlog 
            key={post.id}
            id={post.id}
            imagen={post.imagen}
            alt={post.alt}
            titulo={post.titulo}
            descripcion={post.descripcion}
          />
        ))}
      </div>
    </main>
  );
}