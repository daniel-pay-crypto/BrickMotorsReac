import IconoCircular from '../atoms/IconoCircular';
import './TarjetaBeneficio.css';

export function TarjetaBeneficio({ icono, titulo, texto }) {
  return (
    <div className="tarjeta-beneficio">
      <IconoCircular emoji={icono} descripcion={titulo} />
      <h3 className="tarjeta-beneficio__titulo">{titulo}</h3>
      <p className="tarjeta-beneficio__texto">{texto}</p>
    </div>
  );
}
