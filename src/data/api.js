let token = null;
let renovacion;
let revision = 0;

async function solicitar(ruta, metodo, datos) {
  const headers = { 'X-Brick-Client': 'web' };
  if (token) headers.Authorization = 'Bearer ' + token;
  if (datos !== undefined) headers['Content-Type'] = 'application/json';
  const respuesta = await fetch((import.meta.env?.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '') + '/' + ruta, {
    method: metodo, headers, credentials: 'include', cache: 'no-store',
    body: datos === undefined ? undefined : JSON.stringify(datos),
  });
  const cuerpo = await respuesta.text();
  let resultado;
  try { resultado = cuerpo ? JSON.parse(cuerpo) : null; }
  catch { throw new Error('La API devolvió una respuesta inesperada.'); }
  if (!respuesta.ok) {
    const error = new Error(resultado?.detalle || 'No se pudo completar la operación.');
    error.status = respuesta.status;
    throw error;
  }
  return resultado;
}

function actualizar(datos) {
  token = datos?.token || null;
  window.dispatchEvent(new CustomEvent('brick-sesion', { detail: datos?.usuario || null }));
  return datos?.usuario || null;
}

export function renovar() {
  if (!renovacion) {
    const actual = revision;
    renovacion = solicitar('usuarios/renovar', 'POST').then(datos =>
      actual === revision ? actualizar(datos) : null
    ).catch(error => {
      if (error.status !== 401) throw error;
      if (actual === revision) actualizar(null);
      return null;
    }).finally(() => { renovacion = null; });
  }
  return renovacion;
}

export async function ingresar(datos) {
  const sesion = await solicitar('usuarios/login', 'POST', datos);
  revision++;
  return actualizar(sesion);
}

export async function salir() {
  await solicitar('usuarios/salir', 'POST');
  revision++;
  actualizar(null);
}

export async function api(ruta, metodo = 'GET', datos) {
  try { return await solicitar(ruta, metodo, datos); }
  catch (error) {
    if (error.status === 401 && await renovar()) return solicitar(ruta, metodo, datos);
    throw error;
  }
}
