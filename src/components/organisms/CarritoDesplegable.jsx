import { useEffect, useRef } from 'react';
import { calcularPrecioFinal, getLegos } from '../../data/legosData';
import './CarritoDesplegable.css';

const formatearPrecio = (valor) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Number(valor) || 0);

export function CarritoDesplegable({
  abierto = false,
  items = [],
  totalItems,
  totalPrecio,
  onCerrar = () => {},
  onCambiarCantidad = () => {},
  onAumentar = () => {},
  onReducir = () => {},
  onEliminar = () => {},
  onVaciar = () => {},
  onFinalizarCompra,
}) {
  const botonCerrar = useRef(null);
  const catalogo = new Map(getLegos().map((producto) => [producto.id, producto]));

  const productosCarrito = items.map((item) => {
    const producto = catalogo.get(item.id);
    const precio = Number(item.precio ?? producto?.precio ?? 0);
    const descuento = Number(item.descuento ?? producto?.descuento ?? 0);
    const precioFinal = calcularPrecioFinal(precio, descuento);
    const cantidad = Number(item.cantidad) || 1;

    return {
      ...item,
      nombre: item.nombre || producto?.nombre || 'Producto sin nombre',
      imagen: item.imagen || producto?.imagen || '/img/legos.jpg',
      descripcion: item.descripcion || producto?.descripcion || 'Sin descripción disponible',
      stock: Number(item.stock ?? producto?.stock ?? cantidad),
      precio,
      descuento,
      precioFinal,
      cantidad,
      subtotal: precioFinal * cantidad,
    };
  });

  const unidades = totalItems ?? productosCarrito.reduce((suma, item) => suma + item.cantidad, 0);
  const total = totalPrecio ?? productosCarrito.reduce((suma, item) => suma + item.subtotal, 0);

  useEffect(() => {
    if (!abierto) return;

    const overflowAnterior = document.body.style.overflow;
    const focoAnterior = document.activeElement;
    document.body.style.overflow = 'hidden';
    botonCerrar.current?.focus();

    const manejarTecla = (evento) => {
      if (evento.key === 'Escape') onCerrar();
    };

    document.addEventListener('keydown', manejarTecla);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener('keydown', manejarTecla);
      focoAnterior?.focus?.();
    };
  }, [abierto, onCerrar]);

  const cambiarCantidad = (item, valor) => {
    const cantidad = Number(valor);
    if (!Number.isInteger(cantidad) || cantidad < 1) return;
    onCambiarCantidad(item.id, Math.min(cantidad, item.stock));
  };

  return (
    <div className={`bmcarrito-contenedor ${abierto ? 'bmcarrito-abierto' : ''}`} aria-hidden={!abierto}>
      <button
        className="bmcarrito-fondo"
        type="button"
        aria-label="Cerrar carrito de compras"
        onClick={onCerrar}
        tabIndex={abierto ? 0 : -1}
      />
      <aside className="bmcarrito-panel" role="dialog" aria-modal={abierto} aria-label="Carrito de compras">
        <header className="bmcarrito-encabezado">
          <div className="bmcarrito-titulos">
            <h2>Mi carrito</h2>
            <span>{unidades} {unidades === 1 ? 'producto' : 'productos'}</span>
          </div>
          <button
            ref={botonCerrar}
            className="bmcarrito-cerrar"
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar carrito"
            tabIndex={abierto ? 0 : -1}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="bmcarrito-contenido">
          {productosCarrito.length === 0 ? (
            <div className="bmcarrito-vacio">
              <span className="bmcarrito-vacio-icono" aria-hidden="true">🛒</span>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega productos para verlos aquí.</p>
            </div>
          ) : (
            <ul className="bmcarrito-lista">
              {productosCarrito.map((item) => (
                <li className="bmcarrito-producto" key={item.id}>
                  <div className="bmcarrito-imagen-contenedor">
                    <img className="bmcarrito-imagen" src={item.imagen} alt={item.nombre} loading="lazy" />
                  </div>
                  <div className="bmcarrito-informacion">
                    <h3 className="bmcarrito-nombre">{item.nombre}</h3>
                    <p className="bmcarrito-descripcion">{item.descripcion}</p>
                    <div className="bmcarrito-precios">
                      {item.descuento > 0 && (
                        <span className="bmcarrito-precio-original">{formatearPrecio(item.precio)} · -{item.descuento}%</span>
                      )}
                      <span className="bmcarrito-precio">{formatearPrecio(item.precioFinal)}</span>
                      <span className="bmcarrito-subtotal">Subtotal: {formatearPrecio(item.subtotal)}</span>
                    </div>
                    <div className="bmcarrito-acciones">
                      <div className="bmcarrito-cantidad">
                        <button
                          type="button"
                          disabled={item.cantidad <= 1}
                          onClick={() => onReducir(item.id)}
                          aria-label={`Disminuir cantidad de ${item.nombre}`}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={item.stock}
                          value={item.cantidad}
                          onChange={(evento) => cambiarCantidad(item, evento.target.value)}
                          aria-label={`Cantidad de ${item.nombre}`}
                        />
                        <button
                          type="button"
                          disabled={item.cantidad >= item.stock}
                          onClick={() => onAumentar(item.id)}
                          aria-label={`Aumentar cantidad de ${item.nombre}`}
                        >
                          +
                        </button>
                      </div>
                      <button className="bmcarrito-eliminar" type="button" onClick={() => onEliminar(item.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="bmcarrito-pie">
          <div className="bmcarrito-total">
            <span>Total</span>
            <strong>{formatearPrecio(total)}</strong>
          </div>
          {typeof onFinalizarCompra === 'function' && (
            <button
              className="bmcarrito-comprar"
              type="button"
              disabled={productosCarrito.length === 0}
              onClick={onFinalizarCompra}
            >
              Finalizar compra
            </button>
          )}
          <button
            className="bmcarrito-vaciar"
            type="button"
            disabled={productosCarrito.length === 0}
            onClick={onVaciar}
          >
            Vaciar carrito
          </button>
          <button className="bmcarrito-seguir" type="button" onClick={onCerrar}>
            Seguir comprando
          </button>
        </footer>
      </aside>
    </div>
  );
}

export default CarritoDesplegable;
