import { leerAlmacen, guardarAlmacen } from './almacen.js';

const personalInicial = [
  { id: 1, nombre: 'Juan Pérez', correo: 'juan@gmail.com', tipo: 'Administrador' },
];

export const getPersonal = () => leerAlmacen('personal', personalInicial);

export const addPersonal = (persona) => {
  const personal = getPersonal();
  const nuevoId = personal.length > 0 ? Math.max(...personal.map((p) => p.id)) + 1 : 1;
  const nueva = { ...persona, id: nuevoId };
  guardarAlmacen('personal', [...personal, nueva]);
  return nueva;
};

export const updatePersonal = (id, datos) => {
  const personal = getPersonal().map((p) => (p.id === id ? { ...p, ...datos } : p));
  guardarAlmacen('personal', personal);
  return personal.find((p) => p.id === id);
};
