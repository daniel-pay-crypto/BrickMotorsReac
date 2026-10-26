import './TarjetaProducto.css';
import { useCarrito } from '../../context/CarritoContext';
import { calcularPrecioFinal } from '../../data/legosData';

export function TarjetaProducto({ lego }) {
  const { agregar } = useCarrito();
  const tieneDescuento = lego.descuento > 0;
  const sinStock = lego.stock < 1;

  return (
    <div className="tarjeta-producto">
      {tieneDescuento && <span className="etiqueta-descuento">-{lego.descuento}%</span>}
      <img src={lego.imagen} alt={lego.nombre} />
      <h3>{lego.nombre}</h3>
      {tieneDescuento && (
        <p className="precio-original">${lego.precio.toLocaleString('es-CL')}</p>
      )}
      <p className="precio">${calcularPrecioFinal(lego.precio, lego.descuento).toLocaleString('es-CL')}</p>
      <button className="btn-agregar" onClick={() => agregar(lego)} disabled={sinStock}>
        {sinStock ? 'Sin stock' : 'Agregar al Carrito'}
      </button>
    </div>
  );
}
