import './IconoCircular.css';

function IconoCircular({ emoji, descripcion }) {
  return (
    <span className="icono-circular" role="img" aria-label={descripcion}>
      {emoji}
    </span>
  );
}

export default IconoCircular;
