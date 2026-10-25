import TarjetaDesarrollador from '../molecules/TarjetaDesarrollador';

// Organismo: grilla responsiva con las tarjetas del equipo

export function SeccionEquipo({ members = [] }) {
  if (members.length === 0) {
    return <p className="text-center">No hay integrantes para mostrar.</p>;
  }

  return (
    <div className="row g-4">
      {members.map((m) => (
        <div key={m.id} className="col-12 col-md-4">
          <TarjetaDesarrollador
            name={m.name}
            role={m.role}
            description={m.description}
          />
        </div>
      ))}
    </div>
  );
}