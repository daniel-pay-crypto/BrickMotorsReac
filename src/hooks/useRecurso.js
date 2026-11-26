import { useEffect, useState } from 'react';
import { api } from '../data/api.js';

export function useRecurso(ruta) {
  const [estado, setEstado] = useState({});
  const [version, setVersion] = useState(0);
  useEffect(() => {
    let activo = true;
    if (ruta) api(ruta).then(datos => {
      if (activo) setEstado({ ruta, datos });
    }).catch(error => {
      if (activo) setEstado({ ruta, error });
    });
    return () => { activo = false; };
  }, [ruta, version]);
  return { ...(estado.ruta === ruta ? estado : {}), recargar: () => setVersion(v => v + 1) };
}
