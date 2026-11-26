import { getLegos, addLego, updateLego, calcularPrecioFinal } from './fixtures/legosData.js';
import { getPersonal, addPersonal, updatePersonal } from './fixtures/personalData.js';
import { registrarUsuario, buscarUsuario, getUsuariosRegistrados } from './fixtures/usuariosData.js';

export function instalarApiPrueba() {
  let sesion;
  let carrito = [];
  const respuesta = (datos, status = 200) => new Response(JSON.stringify(datos), { status });
  return spyOn(window, 'fetch').and.callFake(async (url, opciones) => {
    const [ruta] = url.replace('/api/v1/', '').split('?');
    const [recurso, clave] = ruta.split('/');
    const id = Number(clave);
    const datos = opciones.body && JSON.parse(opciones.body);
    const metodo = opciones.method;
    if (ruta === 'usuarios/login') {
      sesion = buscarUsuario(datos.correo, datos.contrasena);
      return sesion ? respuesta({ token: 'prueba', usuario: sesion }) : respuesta({ detalle: 'Correo o contraseña incorrectos.' }, 401);
    }
    if (ruta === 'usuarios/renovar') return sesion ? respuesta({ token: 'renovado', usuario: sesion }) : respuesta({}, 401);
    if (ruta === 'usuarios/salir') { sesion = null; return respuesta(null); }
    if (ruta === 'usuarios/personal') return respuesta(addPersonal({ ...datos.usuario, tipo: datos.rol }));
    if (recurso === 'usuarios') {
      if (metodo === 'POST') return registrarUsuario(datos) ? respuesta({}, 201) : respuesta({ detalle: 'Ese correo ya está registrado.' }, 409);
      if (metodo === 'PUT') return respuesta(updatePersonal(id, { ...datos, tipo: datos.rol }));
      return respuesta([...getPersonal().map(u => ({ ...u, rol: u.tipo })), ...getUsuariosRegistrados().map((u,i) => ({ nombre: u.nombre, correo: u.correo, id: 100 + i, rol: 'CLIENTE' }))]);
    }
    if (recurso === 'productos') {
      if (metodo === 'POST') return respuesta(addLego(datos));
      if (metodo === 'PUT') return respuesta(updateLego(id, { ...datos, oferta: datos.descuento > 0 }));
      const producto = getLegos().find(p => p.id === id);
      return clave ? respuesta(producto || {}, producto ? 200 : 404) : respuesta(getLegos());
    }
    if (recurso === 'categorias') return respuesta(['Technic', 'Star Wars', 'MOC'].map((nombre, i) => ({ id: i + 1, nombre })));
    if (recurso === 'contacto') return respuesta({ id: 1 }, 201);
    if (recurso === 'carrito') {
      if (metodo === 'DELETE') carrito = id ? carrito.filter(i => i.producto.id !== id) : [];
      if (metodo === 'PUT') {
        const producto = getLegos().find(p => p.id === id);
        if (!producto || datos.cantidad > producto.stock) return respuesta({ detalle: 'Stock insuficiente' }, 409);
        carrito = [...carrito.filter(i => i.producto.id !== id), { producto: { ...producto, precioFinal: calcularPrecioFinal(producto.precio, producto.descuento) }, cantidad: datos.cantidad }];
      }
      return respuesta(carrito);
    }
    throw new Error('Ruta de prueba desconocida ' + ruta);
  });
}
