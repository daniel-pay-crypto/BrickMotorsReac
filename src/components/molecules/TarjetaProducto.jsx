import { Link } from 'react-router-dom';
import Etiqueta from '../atoms/Etiqueta';
import { calcularPrecioFinal } from '../../data/legosData';
import './TarjetaProducto.css';

const UNIDADES_POCAS = 2;

export function TarjetaProducto({ lego, onAgregar = () => {} }) {
  const tieneDescuento = Number(lego.descuento) > 0;
  const sinStock = Number(lego.stock) < 1;
  const pocasUnidades = !sinStock && Number(lego.stock) <= UNIDADES_POCAS;
  const precioFinal = calcularPrecioFinal(lego.precio, lego.descuento || 0).toLocaleString('es-CL');
  const rutaDetalle = `/products/${lego.id}`;

  return (
    <article className="tarjeta-producto">
      {(tieneDescuento || pocasUnidades) && (
        <div className="etiquetas-tarjeta">
          {tieneDescuento && <Etiqueta variante="descuento">-{lego.descuento}%</Etiqueta>}
          {pocasUnidades && <Etiqueta variante="aviso">¡Últimas unidades!</Etiqueta>}
        </div>
      )}

      <Link to={rutaDetalle} className="tarjeta-producto__enlace">
        <div className="tarjeta-producto__imagen">
          <img src={lego.imagen || '/img/legos.jpg'} alt={lego.nombre} loading="lazy" />
        </div>
        <h3 title={lego.nombre}>{lego.nombre}</h3>
      </Link>

      <Link className="btn-ver-detalle" to={rutaDetalle}>Ver detalles del producto</Link>

      {tieneDescuento && <p className="precio-original">${Number(lego.precio).toLocaleString('es-CL')}</p>}
      <p className="precio">${precioFinal}</p>

      <button className="btn-agregar" type="button" onClick={() => onAgregar(lego)} disabled={sinStock}>
        {sinStock ? 'Sin stock' : 'Agregar al Carrito'}
      </button>
    </article>
  );
}
