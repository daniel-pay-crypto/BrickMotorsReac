

export function TarjetaDesarrollador({ nombre, rol, descripcion }) {
  return (
    <div className="tarjeta-desarrollador">
      <h3>{nombre}</h3>
      <span className="rol">{rol}</span>
      <p>{descripcion}</p>
    </div>
  );
}