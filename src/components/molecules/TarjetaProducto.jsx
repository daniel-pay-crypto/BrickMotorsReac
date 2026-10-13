export function TarjetaProducto({ lego }) {
  return (
    <div className="tarjeta-producto">
      <img src={lego.imagen} alt={lego.nombre} />
      <h3>{lego.nombre}</h3>
      <p className="precio">${lego.precio.toLocaleString('es-CL')}</p>
      <button className="btn-agregar">Agregar al Carrito</button>
    </div>
  );
}