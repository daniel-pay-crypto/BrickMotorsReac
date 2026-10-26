import { registrarUsuario, buscarUsuario } from '../../data/usuariosData';

describe('usuariosData', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('registra un usuario y permite iniciar sesion con el', () => {
    expect(registrarUsuario({ nombre: 'Ana Gómez', correo: 'Ana@gmail.com', contrasena: 'Clave123!' })).toBe(true);
    const usuario = buscarUsuario('ana@gmail.com', 'Clave123!');
    expect(usuario.nombre).toBe('Ana Gómez');
    expect(usuario.esAdmin).toBe(false);
    expect(buscarUsuario('ana@gmail.com', 'otraClave1!')).toBeNull();
  });

  it('no permite registrar un correo repetido ni el del admin', () => {
    registrarUsuario({ nombre: 'Ana', correo: 'ana@gmail.com', contrasena: 'Clave123!' });
    expect(registrarUsuario({ nombre: 'Ana 2', correo: 'ana@gmail.com', contrasena: 'Clave123!' })).toBe(false);
    expect(registrarUsuario({ nombre: 'Falso', correo: 'admin@gmail.com', contrasena: 'Clave123!' })).toBe(false);
  });

  it('solo deja entrar como admin con la contraseña correcta', () => {
    expect(buscarUsuario('admin@gmail.com', 'Admin123').esAdmin).toBe(true);
    expect(buscarUsuario('admin@gmail.com', 'admin123')).toBeNull();
    expect(buscarUsuario('admin@gmail.com', '')).toBeNull();
  });
});
