import { useAnimarAlVer } from '../../hooks/useAnimarAlVer';
import './Revelar.css';

function Revelar({ children, className = '', umbral = 0.15 }) {
  const ref = useAnimarAlVer(umbral);

  return (
    <div ref={ref} className={`revelar ${className}`.trim()}>
      {children}
    </div>
  );
}

export default Revelar;
