
//Datos iniciales catálogo de Star Wars
let legos = [
  { id: 1, nombre: "Caminante AT-ST", categoria: "Star Wars", precio: 150000, stock: 5, oferta: false, imagen: "/img/at-st.png" },
  { id: 2, nombre: "Destructor Estelar", categoria: "Star Wars", precio: 700000, stock: 2, oferta: false, imagen: "/img/stardestroyer.png" },
  { id: 3, nombre: "AT-AT Supremacy", categoria: "Star Wars", precio: 850000, stock: 1, oferta: false, imagen: "/img/Fotoat1.jpeg" },
  { id: 4, nombre: "Halcón Milenario", categoria: "Star Wars", precio: 800000, stock: 3, oferta: false, imagen: "/img/halconmilenario.png" },
  { id: 5, nombre: "LEGO® Star Wars Pack De Combate: Emboscada En Mandalore", categoria: "Star Wars", precio: 29690, stock: 10, oferta: false, imagen: "https://www.tiendacopec.cl/cdn/shop/files/720196-1.jpg?v=1743191792" },
  { id: 6, nombre: "LEGO® Star Wars Caza Estelar N-1 De Mando Y Grogu", categoria: "Star Wars", precio: 49490, stock: 8, oferta: false, imagen: "https://www.tiendacopec.cl/cdn/shop/files/720198-1.jpg?v=1743191837&width=1200" },
  { id: 7, nombre: "Lego Star Wars Hogar De Grogu", categoria: "Star Wars", precio: 31670, stock: 5, oferta: false, imagen: "https://www.tiendacopec.cl/cdn/shop/files/673419422390-1.jpg?v=1776276054&width=1200" },
  { id: 8, nombre: "Pack de Combate: Soldado Clon y Droide de Combate", categoria: "Star Wars", precio: 49990, stock: 12, oferta: true, imagen: "https://www.tiendalego.cl/cdn/shop/products/75372_box_1000x1000.jpg?v=1773684544" },
  { id: 9, nombre: "Pack de Combate: Sitio de Mandalore", categoria: "Star Wars", precio: 39990, stock: 15, oferta: false, imagen: "https://www.tiendalego.cl/cdn/shop/files/75449_Box1_v39_851x851.jpg?v=1773686157" },
  { id: 10, nombre: "Set LEGO Star Wars Tm Caza TIE y Ala-X Fusionados", categoria: "Star Wars", precio: 239990, stock: 4, oferta: false, imagen: "https://i5.walmartimages.cl/asr/b852af15-b7d4-490e-b1fe-fb24b2dc781d.f07979af1b6845db9b5a4205bcf003fa.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
  { id: 11, nombre: "Set De Construcción Lego 75412 Star Wars", categoria: "Star Wars", precio: 31662, stock: 7, oferta: true, imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_789595-MLA114764147006_082026-F.webp" },
  { id: 12, nombre: "Pack de Combate: Clon Troopers de la 501", categoria: "Star Wars", precio: 32990, stock: 20, oferta: false, imagen: "https://www.tiendalego.cl/cdn/shop/products/75345_box_851x851.jpg?v=1773072246" },
  { id: 13, nombre: "Casco de Piloto de AT-RT del Remanente Imperial", categoria: "Star Wars", precio: 109990, stock: 3, oferta: false, imagen: "https://www.tiendalego.cl/cdn/shop/files/75458_Box1_v39_851x851.jpg?v=1782417013" },
  { id: 14, nombre: "Busto de Darth Vader", categoria: "Star Wars", precio: 89990, stock: 2, oferta: true, imagen: "https://www.tiendalego.cl/cdn/shop/files/75439_Box1_v39_851x851.jpg?v=1776799113" }
];

// 2. Funciones CRUD
export const getLegos = () => {
  return legos;
};

export const getLegoById = (id) => {
  return legos.find(lego => lego.id === id);
};

export const addLego = (nuevoLego) => {
  const nuevoId = legos.length > 0 ? legos[legos.length - 1].id + 1 : 1;
  const legoConId = { ...nuevoLego, id: nuevoId };
  legos.push(legoConId);
  return legoConId;
};

export const updateLego = (id, datosActualizados) => {
  legos = legos.map(lego => (lego.id === id ? { ...lego, ...datosActualizados } : lego));
  return getLegoById(id);
};

export const deleteLego = (id) => {
  legos = legos.filter(lego => lego.id !== id);
  return legos;
};