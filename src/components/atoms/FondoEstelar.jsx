import './FondoEstelar.css';

/** Capas decorativas: el contenido y los enlaces permanecen accesibles. */
export function FondoEstelar() {
  return (
    <div className="fondo-estelar" aria-hidden="true">
      <span className="fondo-estelar__estrellas fondo-estelar__estrellas--cerca" />
      <span className="fondo-estelar__estrellas fondo-estelar__estrellas--lejos" />
    </div>
  );
}
