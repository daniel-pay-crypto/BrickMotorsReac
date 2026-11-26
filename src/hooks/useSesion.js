import { useEffect, useState } from 'react';
import { ingresar, renovar, salir } from '../data/api.js';
import { borrarAlmacen } from '../data/almacen.js';

export function useSesion() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    borrarAlmacen('sesion');
    borrarAlmacen('usuarios');
    const recibir = evento => setUsuario(evento.detail);
    window.addEventListener('brick-sesion', recibir);
    renovar().catch(e => setError(e.message)).finally(() => setCargando(false));
    return () => window.removeEventListener('brick-sesion', recibir);
  }, []);
  return { usuario, cargando, error, iniciarSesion: ingresar,
    cerrarSesion: () => salir().catch(e => setError(e.message)) };
}
