import { TarjetaDesarrollador } from '../components/molecules/TarjetaDesarrollador';

export function Nosotros() {
  const equipo = [

    {
      nombre: "Thomas Osorio",
      rol: "Frontend / Animaciones",
      descripcion: "El cerebro detrás de las animaciones de batalla y el flujo visual. Si la interfaz se ve impresionante, pasó por sus manos. (Este hombre es un Genio creativo)"
    },


    {
      nombre: "Daniel Leyton",
      rol: "Arquitecto",
      descripcion: "Encargado de orquestar el código, resolver errores críticos a altas horas de la madrugada y mantener la estructura web a flote. Porsupuesto"
    },


    {
      nombre: "Felipe Baez",
      rol: "Backend / Lógica",
      descripcion: "Especialista (en lol) en estructurar el control de datos, carritos de compras y asegurar que cada línea de lógica responda a la perfección. Pura Perfeccion"
    }

  ];

  return (
    <main className="seccion-nosotros-hero">
      <div className="overlay-nosotros">
        <h1 className="titulo-nosotros">Mentes Detrás de Brick Motors</h1>
        <p className="subtitulo-nosotros">
          Sobrevivientes a largas noches de depuración de código, desarrollo de la tienda Brick Motors, y miles de piezas LEGO (JAJA).
        </p>

        <div className="grid-equipo">
          {equipo.map((miembro, index) => (
            <TarjetaDesarrollador 
              key={index}
              nombre={miembro.nombre}
              rol={miembro.rol}
              descripcion={miembro.descripcion}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
