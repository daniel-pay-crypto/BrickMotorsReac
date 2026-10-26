import './PanelCarrito.css';
import Button from '../atoms/Button.jsx';
import { ItemCarrito } from '../molecules/ItemCarrito';
import { useCarrito } from '../../context/CarritoContext';

export function PanelCarrito() {
  const {
    items,
    panelAbierto,
    cantidadTotal,
    total,
    cambiarCantidad,
    aumentar,
    reducir,
    eliminar,
    vaciar,
    cerrarPanel,
  } = useCarrito();

  return (
    <aside className={`panel-carrito ${panelAbierto ? 'activo' : ''}`} aria-label="Carrito de compras">
      <div className="carrito-header">
        <h3>Mi carrito ({cantidadTotal})</h3>
        <button className="btn-cerrar-carrito" onClick={cerrarPanel} aria-label="Cerrar carrito">
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
              onCambiarCantidad={(cantidad) => cambiarCantidad(item.id, cantidad)}
              onAumentar={() => aumentar(item.id)}
              onReducir={() => reducir(item.id)}
              onEliminar={() => eliminar(item.id)}
            />
          ))
        )}
      </div>
      <div className="carrito-totales">
        <p>Unidades: {cantidadTotal}</p>
        <p>Total: ${total.toLocaleString('es-CL')}</p>
        <Button variant="danger" onClick={vaciar} disabled={items.length === 0}>
          Vaciar carrito
        </Button>
      </div>
    </aside>
  );
}
