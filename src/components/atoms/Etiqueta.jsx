import './Etiqueta.css';

function Etiqueta({ variante = 'novedad', children }) {
  return <span className={`etiqueta-pildora etiqueta-pildora--${variante}`}>{children}</span>;
}

export default Etiqueta;
