import { leerAlmacen, guardarAlmacen } from './almacen.js';

const legosIniciales = [
  { id: 1, codigo: "ATST-001", nombre: "Caminante AT-ST", categoria: "Star Wars", precio: 150000, stock: 5, oferta: false, imagen: "/img/at-st.png" },
  { id: 2, codigo: "DEST-001", nombre: "Destructor Estelar", categoria: "Star Wars", precio: 700000, stock: 2, oferta: false, imagen: "/img/stardestroyer.png" },
  { id: 3, codigo: "ATAT-001", nombre: "AT-AT Supremacy", categoria: "Star Wars", precio: 850000, stock: 1, oferta: false, imagen: "/img/Fotoat1.jpeg" },
  { id: 4, codigo: "HALC-001", nombre: "Halcón Milenario", categoria: "Star Wars", precio: 800000, stock: 3, oferta: false, imagen: "/img/halconmilenario.png" },
  { id: 5, codigo: "SW-005", nombre: "LEGO® Star Wars Pack De Combate: Emboscada En Mandalore", categoria: "Star Wars", precio: 29690, stock: 10, oferta: false, imagen: "https://www.tiendacopec.cl/cdn/shop/files/720196-1.jpg?v=1743191792" },
  { id: 6, codigo: "SW-006", nombre: "LEGO® Star Wars Caza Estelar N-1 De Mando Y Grogu", categoria: "Star Wars", precio: 49490, stock: 8, oferta: false, imagen: "https://www.tiendacopec.cl/cdn/shop/files/720198-1.jpg?v=1743191837&width=1200" },
  { id: 7, codigo: "SW-007", nombre: "Lego Star Wars Hogar De Grogu", categoria: "Star Wars", precio: 31670, stock: 5, oferta: false, imagen: "https://www.tiendacopec.cl/cdn/shop/files/673419422390-1.jpg?v=1776276054&width=1200" },
  { id: 8, codigo: "SW-008", nombre: "Pack de Combate: Soldado Clon y Droide de Combate", categoria: "Star Wars", precio: 49990, stock: 12, oferta: true, descuento: 20, imagen: "https://www.tiendalego.cl/cdn/shop/products/75372_box_1000x1000.jpg?v=1773684544" },
  { id: 9, codigo: "SW-009", nombre: "Pack de Combate: Sitio de Mandalore", categoria: "Star Wars", precio: 39990, stock: 15, oferta: false, imagen: "https://www.tiendalego.cl/cdn/shop/files/75449_Box1_v39_851x851.jpg?v=1773686157" },
  { id: 10, codigo: "SW-010", nombre: "Set LEGO Star Wars Tm Caza TIE y Ala-X Fusionados", categoria: "Star Wars", precio: 239990, stock: 4, oferta: false, imagen: "https://i5.walmartimages.cl/asr/b852af15-b7d4-490e-b1fe-fb24b2dc781d.f07979af1b6845db9b5a4205bcf003fa.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
  { id: 11, codigo: "SW-011", nombre: "Set De Construcción Lego 75412 Star Wars", categoria: "Star Wars", precio: 31662, stock: 7, oferta: true, imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_789595-MLA114764147006_082026-F.webp" },
  { id: 12, codigo: "SW-012", nombre: "Pack de Combate: Clon Troopers de la 501", categoria: "Star Wars", precio: 32990, stock: 20, oferta: false, imagen: "https://www.tiendalego.cl/cdn/shop/products/75345_box_851x851.jpg?v=1773072246" },
  { id: 13, codigo: "SW-013", nombre: "Casco de Piloto de AT-RT del Remanente Imperial", categoria: "Star Wars", precio: 109990, stock: 3, oferta: false, imagen: "https://www.tiendalego.cl/cdn/shop/files/75458_Box1_v39_851x851.jpg?v=1782417013" },
  { id: 14, codigo: "SW-014", nombre: "Busto de Darth Vader", categoria: "Star Wars", precio: 89990, stock: 2, oferta: true, descuento: 20, imagen: "https://www.tiendalego.cl/cdn/shop/files/75439_Box1_v39_851x851.jpg?v=1776799113" }
];

export const calcularPrecioFinal = (precio, descuento = 0) => Math.round((precio * (100 - descuento)) / 100);

export const getLegos = () => leerAlmacen('legos', legosIniciales);

export const getLegoById = (id) => getLegos().find((lego) => lego.id === id);

export const addLego = (nuevoLego) => {
  const legos = getLegos();
  const nuevoId = legos.length > 0 ? Math.max(...legos.map((lego) => lego.id)) + 1 : 1;
  const legoConId = { ...nuevoLego, id: nuevoId };
  guardarAlmacen('legos', [...legos, legoConId]);
  return legoConId;
};

export const updateLego = (id, datosActualizados) => {
  const legos = getLegos().map((lego) => (lego.id === id ? { ...lego, ...datosActualizados } : lego));
  guardarAlmacen('legos', legos);
  return legos.find((lego) => lego.id === id);
};

export const deleteLego = (id) => {
  const legos = getLegos().filter((lego) => lego.id !== id);
  guardarAlmacen('legos', legos);
  return legos;
};
