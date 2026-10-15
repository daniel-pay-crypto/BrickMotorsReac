export const patronGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export const estaVacio = (valor) => valor.trim() === '';

export const esGmailValido = (valor) => patronGmail.test(valor.trim());