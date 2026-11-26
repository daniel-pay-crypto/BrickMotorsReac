import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { calcularPrecioFinal, getLegoById, getLegos } from '../data/legosData';
import './ProductDetail.css';

const dinero = (precio) => `$${Number(precio).toLocaleString('es-CL')}`;

export default function ProductDetail({ agregarAlCarrito = () => {} }) {
  const { id } = useParams();
  const productoId = Number(id);
  const producto = Number.isSafeInteger(productoId) && productoId > 0
    ? getLegoById(productoId)
    : null;

  useEffect(() => {
    window.scrollTo?.(0, 0);
  }, [id]);

  if (!producto) {
    return (
      <main className="detalle-producto pagina-sin-producto">
        <div className="detalle-producto__no-encontrado">
          <span className="detalle-producto__eyebrow">BRICK MOTORS</span>
          <h1>Producto no encontrado</h1>
          <p>Puede que el producto ya no esté disponible en nuestro catálogo.</p>
          <Link className="detalle-producto__boton" to="/productos">Volver al catálogo</Link>
        </div>
      </main>
    );
  }

  const descuento = Number(producto.descuento) || 0;
  const precioFinal = calcularPrecioFinal(producto.precio, descuento);
  const sinStock = Number(producto.stock) < 1;
  const pocasUnidades = !sinStock && Number(producto.stock) <= 2;
  const relacionados = getLegos()
    .filter((otro) => otro.id !== producto.id && otro.categoria === producto.categoria)
    .slice(0, 3);

  return (
    <main className="detalle-producto">
      <div className="detalle-producto__contenedor">
        <nav className="detalle-producto__migas" aria-label="Navegación de producto">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to="/productos">Productos</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{producto.nombre}</span>
        </nav>

        <section className="detalle-producto__principal" aria-labelledby="detalle-producto-nombre">
          <div className="detalle-producto__visual">
            {descuento > 0 && <span className="detalle-producto__descuento">-{descuento}% OFF</span>}
            <img src={producto.imagen || '/img/legos.jpg'} alt={producto.nombre} />
            <p>BRICK MOTORS · COLECCIÓN LEGO</p>
          </div>

          <div className="detalle-producto__informacion">
            <span className="detalle-producto__eyebrow">{producto.categoria || 'Colección Brick Motors'}</span>
            <h1 id="detalle-producto-nombre">{producto.nombre}</h1>
            <p className="detalle-producto__codigo">Código: {producto.codigo || 'No disponible'}</p>

            <div className="detalle-producto__precios">
              {descuento > 0 && (
                <div className="detalle-producto__oferta">
                  <span className="detalle-producto__precio-anterior">{dinero(producto.precio)}</span>
                  <span className="detalle-producto__ahorro">Ahorras {dinero(Number(producto.precio) - precioFinal)}</span>
                </div>
              )}
              <p className="detalle-producto__precio-final">{dinero(precioFinal)}</p>
              <span className="detalle-producto__moneda">Precio en pesos chilenos (CLP)</span>
            </div>

            <div className="detalle-producto__disponibilidad">
              <span className={`detalle-producto__estado ${sinStock ? 'detalle-producto__estado--agotado' : ''}`}>
                {sinStock ? 'Sin stock' : pocasUnidades ? '¡Últimas unidades!' : 'Disponible'}
              </span>
              <span>{sinStock ? 'Este producto no tiene unidades disponibles.' : `Stock disponible: ${producto.stock} unidades`}</span>
            </div>

            <button
              className="detalle-producto__boton detalle-producto__boton--comprar"
              type="button"
              disabled={sinStock}
              onClick={() => agregarAlCarrito(producto)}
            >
              {sinStock ? 'Producto agotado' : 'Agregar al Carrito'}
            </button>
            <Link className="detalle-producto__seguir" to="/productos">← Seguir viendo productos</Link>
          </div>
        </section>

        <section className="detalle-producto__descripcion" aria-labelledby="detalle-descripcion-titulo">
          <span className="detalle-producto__eyebrow">CONOCE EL PRODUCTO</span>
          <h2 id="detalle-descripcion-titulo">Descripción del producto</h2>
          <p>{producto.descripcion || 'Este producto todavía no tiene descripción disponible.'}</p>
          <div className="detalle-producto__datos">
            <div><span>Categoría</span><strong>{producto.categoria || 'Sin categoría'}</strong></div>
            <div><span>Código</span><strong>{producto.codigo || 'No disponible'}</strong></div>
            <div><span>Disponibilidad</span><strong>{sinStock ? 'Agotado' : `${producto.stock} unidades`}</strong></div>
          </div>
        </section>

        {relacionados.length > 0 && (
          <section className="detalle-producto__relacionados" aria-labelledby="detalle-relacionados-titulo">
            <div className="detalle-producto__relacionados-titulo">
              <div>
                <span className="detalle-producto__eyebrow">SIGUE EXPLORANDO</span>
                <h2 id="detalle-relacionados-titulo">También te podría interesar</h2>
              </div>
              <Link to="/productos">Ver catálogo completo →</Link>
            </div>
            <div className="detalle-producto__relacionados-grid">
              {relacionados.map((otro) => (
                <Link className="detalle-producto__relacionado" key={otro.id} to={`/products/${otro.id}`}>
                  <img src={otro.imagen || '/img/legos.jpg'} alt="" loading="lazy" />
                  <strong>{otro.nombre}</strong>
                  <span>{dinero(calcularPrecioFinal(otro.precio, otro.descuento || 0))}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
