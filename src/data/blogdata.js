export const articulosBlog = {
  1: {
    id: 1,
    titulo: "Los Nuevos Sets Star Wars Ya Están Disponibles",
    fecha: "Publicado el 10 de Septiembre, 2026 por el equipo de Brick Motors",
    imagen: "/img/at-st.png",
    alt: "Nuevos sets Star Wars",
    contenido: [
      { tipo: "p", texto: "La flota de Brick Motors se agranda. Sumamos diez sets nuevos a nuestra sección de Productos, todos inspirados en las últimas naves y personajes de la galaxia." },
      { tipo: "h2", texto: "Packs de Combate" },
      { tipo: "p", texto: "Llegaron los packs de Emboscada en Mandalore, Soldado Clon y Droide de Combate, Sitio de Mandalore y Clon Troopers de la 501. Ideales si buscas escenas de batalla completas para tu vitrina." },
      { tipo: "h2", texto: "Naves y Vehículos" },
      { tipo: "p", texto: "También está disponible el Caza Estelar N-1 de Mando y Grogu, el Hogar de Grogu y el imponente set del Caza TIE y Ala-X Fusionados, uno de los más grandes que hemos tenido en catálogo." },
      { tipo: "h2", texto: "Coleccionables" },
      { tipo: "p", texto: "Para quienes prefieren piezas de exhibición, sumamos el Casco de Piloto de AT-RT del Remanente Imperial y el Busto de Darth Vader." },
      { tipo: "p", texto: "Puedes revisar todos los precios y agregar tus favoritos al carrito directamente desde la sección de Productos." }
    ]
  },
  2: {
    id: 2,
    titulo: "Detrás de Cámaras: Armando Nuestro Primer MOC Technic",
    fecha: "Publicado el 11 de Septiembre, 2026 por el equipo de Brick Motors",
    imagen: "/img/Fotoat1.jpeg",
    alt: "Armado de MOC Technic",
    contenido: [
      { tipo: "p", texto: "Antes de convertirnos en una tienda, Brick Motors nació de un banco de trabajo lleno de piezas Technic. Este fue nuestro primer modelo original, armado a mano y a prueba y error." },
      { tipo: "h2", texto: "El Chasis" },
      { tipo: "p", texto: "Todo modelo Technic serio empieza por el chasis. Usamos vigas reforzadas y ejes cruzados para que la estructura aguantara el peso de los motores sin flectarse." },
      { tipo: "h2", texto: "El Sistema de Marcha" },
      { tipo: "p", texto: "Incorporamos un motor conectado a un tren de engranajes reductores, lo que nos permitió lograr más torque a costa de velocidad. Ese mismo principio es el que usamos hoy en proyectos como el AT-AT Supremacy." },
      { tipo: "h2", texto: "Lo que Aprendimos" },
      { tipo: "p", texto: "Cada tornillo mal puesto fue una lección. Ese primer modelo nos enseñó a planificar el cableado interno antes de cerrar los paneles, algo que hoy aplicamos en todos los sets que armamos para la tienda." },
      { tipo: "p", texto: "Si te gustan los proyectos grandes, no te pierdas el Proyecto Cherno Alpha, nuestra siguiente gran construcción." }
    ]
  },
  3: {
    id: 3,
    titulo: "El Halcón Milenario Aterriza en Brick Motors",
    fecha: "Publicado el 12 de Septiembre, 2026 por el equipo de Brick Motors",
    imagen: "/img/halconmilenario.png",
    alt: "Halcón Milenario",
    contenido: [
      { tipo: "p", texto: "Después de varias semanas de pedidos, el Halcón Milenario ya tiene su lugar fijo en la vitrina de Brick Motors, junto al Caminante AT-ST y el Destructor Estelar." },
      { tipo: "h2", texto: "Un Clásico de la Galaxia" },
      { tipo: "p", texto: "Pocas naves son tan reconocibles como el Halcón Milenario. Su diseño irregular esconde cientos de piezas pequeñas que le dan ese aspecto de nave remendada mil veces y siempre lista para escapar." },
      { tipo: "h2", texto: "Por Qué lo Sumamos al Catálogo" },
      { tipo: "p", texto: "Nos pareció el complemento perfecto para quienes ya tienen el Destructor Estelar y el AT-AT Supremacy: la escena rebelde contra el Imperio, completa, en una sola vitrina." },
      { tipo: "p", texto: "Puedes agregarlo directamente a tu carrito desde nuestra página de Productos Destacados." }
    ]
  }
};

export const getArticuloById = (id) => {
  return articulosBlog[id] || articulosBlog[1];
};