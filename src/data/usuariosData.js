import { leerAlmacen, guardarAlmacen } from './almacen.js';

export const ADMIN = {
  nombre: 'Administrador',
  correo: 'admin@gmail.com',
  contrasena: 'Admin123',
};

const normalizar = (correo) => correo.trim().toLowerCase();

export const getUsuariosRegistrados = () => leerAlmacen('usuarios', []);

export const registrarUsuario = ({ nombre, correo, contrasena }) => {
  const usuarios = getUsuariosRegistrados();
  const correoNormal = normalizar(correo);
  const yaExiste = correoNormal === ADMIN.correo || usuarios.some((u) => u.correo === correoNormal);
  if (yaExiste) {
    return false;
  }
  guardarAlmacen('usuarios', [...usuarios, { nombre: nombre.trim(), correo: correoNormal, contrasena }]);
  return true;
};

export const buscarUsuario = (correo, contrasena) => {
  const correoNormal = normalizar(correo);
  if (correoNormal === ADMIN.correo) {
    return contrasena === ADMIN.contrasena
      ? { nombre: ADMIN.nombre, correo: ADMIN.correo, esAdmin: true }
      : null;
  }
  const usuario = getUsuariosRegistrados().find(
    (u) => u.correo === correoNormal && u.contrasena === contrasena
  );
  return usuario ? { nombre: usuario.nombre, correo: usuario.correo, esAdmin: false } : null;
};
