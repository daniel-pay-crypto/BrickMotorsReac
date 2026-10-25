export const patronGmail = /^[a-z0-9]+([._%+-][a-z0-9]+)*@gmail\.com$/i;

export const patronNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

export const estaVacio = (valor) => valor.trim() === '';

export const esGmailValido = (valor) => {
  const correo = valor.trim();
  if (!patronGmail.test(correo)) {
    return false;
  }
  const usuario = correo.split('@')[0];
  return usuario.length >= 3 && /[a-z]/i.test(usuario);
};

export const tieneLetrasRepetidas = (valor) => /(.)\1\1/i.test(valor);

export const esNombreValido = (valor) => {
  const nombre = valor.trim();
  return (
    nombre.length >= 2 &&
    patronNombre.test(nombre) &&
    !tieneLetrasRepetidas(nombre)
  );
};
