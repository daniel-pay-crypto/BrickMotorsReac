import { useState } from 'react';
import Text from '../atoms/Text';
import RoleBadge from '../atoms/RoleBadge';
import Button from '../atoms/Button';
import '../../styles/molecules/TarjetaDesarrollador.css';

// Molécula: tarjeta de desarrollador (Text + RoleBadge + Button)
export default function TarjetaDesarrollador({ name, role, description }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="tarjeta-desarrollador h-100">
      <Text variant="h3" className="tarjeta-desarrollador__nombre">{name}</Text>
      <RoleBadge role={role} />
      {expanded && (
        <Text variant="p" className="tarjeta-desarrollador__descripcion">
          {description}
        </Text>
      )}

      <div className="tarjeta-desarrollador__acciones pt-3">
        <Button variant="warning" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Ver menos' : 'Ver más'}
        </Button>
      </div>
      
    </div>
  );
}