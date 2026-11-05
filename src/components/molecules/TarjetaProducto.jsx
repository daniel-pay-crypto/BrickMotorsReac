import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './TarjetaProducto.css';
import { calcularPrecioFinal } from '../../data/legosData';

export function TarjetaProducto({ lego, onAgregar = () => {} }) {
  const [verDetalle, setVerDetalle] = useState(false);
  const tieneDescuento = lego.descuento > 0;
  const sinStock = lego.stock < 1;
  const precioFinal = calcularPrecioFinal(lego.precio, lego.descuento).toLocaleString('es-CL');

  const abrirDetalle = () => setVerDetalle(true);
  const cerrarDetalle = () => setVerDetalle(false);

  const agregarDesdeDetalle = () => {
    onAgregar(lego);
    cerrarDetalle();
  };

  return (
    <div className="tarjeta-producto">
      {tieneDescuento && <span className="etiqueta-descuento">-{lego.descuento}%</span>}
      <img src={lego.imagen} alt={lego.nombre} className="clicable" onClick={abrirDetalle} />
      <h3 className="clicable" onClick={abrirDetalle}>{lego.nombre}</h3>
      <button className="btn-ver-detalle" onClick={abrirDetalle}>Ver descripción</button>
      {tieneDescuento && (
        <p className="precio-original">${lego.precio.toLocaleString('es-CL')}</p>
      )}
      <p className="precio">${precioFinal}</p>
      <button className="btn-agregar" onClick={() => onAgregar(lego)} disabled={sinStock}>
        {sinStock ? 'Sin stock' : 'Agregar al Carrito'}
      </button>

      <Modal show={verDetalle} onHide={cerrarDetalle} centered animation={false} contentClassName="modal-detalle-producto">
        <Modal.Header closeButton>
          <Modal.Title>{lego.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={lego.imagen} alt={`Detalle de ${lego.nombre}`} />
          <p className="descripcion-detalle">
            {lego.descripcion || 'Este producto todavía no tiene descripción.'}
          </p>
          <p className="precio-detalle">
            ${precioFinal}
            {tieneDescuento && <span className="descuento-detalle"> (-{lego.descuento}%)</span>}
          </p>
          <p>Stock disponible: {lego.stock}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cerrar-detalle" onClick={cerrarDetalle}>Cerrar</button>
          <button className="btn-agregar btn-agregar-detalle" onClick={agregarDesdeDetalle} disabled={sinStock}>
            {sinStock ? 'Sin stock' : 'Agregar al Carrito'}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
