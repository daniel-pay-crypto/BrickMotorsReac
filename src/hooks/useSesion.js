import { useState } from 'react';
import { leerAlmacen, guardarAlmacen, borrarAlmacen } from '../data/almacen.js';

export function useSesion() {
  const [usuario, setUsuario] = useState(() => leerAlmacen('sesion', null));

  const iniciarSesion = (datos) => {
    setUsuario(datos);
    guardarAlmacen('sesion', datos);
  };

  const cerrarSesion = () => {
    setUsuario(null);
    borrarAlmacen('sesion');
  };

  return { usuario, iniciarSesion, cerrarSesion };
}
