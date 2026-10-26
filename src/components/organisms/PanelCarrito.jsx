import './PanelCarrito.css';
import Button from '../atoms/Button.jsx';
import { ItemCarrito } from '../molecules/ItemCarrito';

export function PanelCarrito({
  abierto = false,
  items = [],
  totalItems = 0,
  totalPrecio = 0,
  onCerrar = () => {},
  onCambiarCantidad = () => {},
  onAumentar = () => {},
  onReducir = () => {},
  onEliminar = () => {},
  onVaciar = () => {},
}) {
  return (
    <aside className={`panel-carrito ${abierto ? 'activo' : ''}`} aria-label="Carrito de compras">
      <div className="carrito-header">
        <h3>Mi carrito ({totalItems})</h3>
        <button className="btn-cerrar-carrito" onClick={onCerrar} aria-label="Cerrar carrito">
          X
        </button>
      </div>
      <div id="lista-carrito">
        {items.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          items.map((item) => (
            <ItemCarrito
              key={item.id}
              item={item}
              onCambiarCantidad={(cantidad) => onCambiarCantidad(item.id, cantidad)}
              onAumentar={() => onAumentar(item.id)}
              onReducir={() => onReducir(item.id)}
              onEliminar={() => onEliminar(item.id)}
            />
          ))
        )}
      </div>
      <div className="carrito-totales">
        <p>Unidades: {totalItems}</p>
        <p>Total: ${totalPrecio.toLocaleString('es-CL')}</p>
        <Button variant="danger" onClick={onVaciar} disabled={items.length === 0}>
          Vaciar carrito
        </Button>
      </div>
    </aside>
  );
}
