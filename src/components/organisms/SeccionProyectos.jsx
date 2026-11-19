import { proyectosDestacados } from '../../data/proyectosDestacados';
import { TarjetaProyecto } from '../molecules/TarjetaProyecto';
import Revelar from '../atoms/Revelar';
import './SeccionProyectos.css';

export function SeccionProyectos() {
  return (
    <section className="seccion-proyectos" id="proyectos" aria-labelledby="titulo-proyectos">
      <div className="seccion-proyectos__encabezado">
        <span>DE LA IMAGINACIÓN A LOS BLOQUES</span>
        <h2 id="titulo-proyectos">Próximos proyectos de Brick Motors</h2>
        <p>Dos universos, una misma pasión: construir algo extraordinario.</p>
      </div>
      <div className="seccion-proyectos__lista">
        {proyectosDestacados.map((proyecto) => (
          <Revelar key={proyecto.id}>
            <TarjetaProyecto proyecto={proyecto} />
          </Revelar>
        ))}
      </div>
    </section>
  );
}
