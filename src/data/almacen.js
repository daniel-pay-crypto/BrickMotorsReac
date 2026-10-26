const memoria = {};

export const leerAlmacen = (clave, valorInicial) => {
  try {
    const texto = localStorage.getItem(clave);
    return texto === null ? valorInicial : JSON.parse(texto);
  } catch {
    return clave in memoria ? memoria[clave] : valorInicial;
  }
};

export const guardarAlmacen = (clave, valor) => {
  memoria[clave] = valor;
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    return false;
  }
  return true;
};

export const borrarAlmacen = (clave) => {
  delete memoria[clave];
  try {
    localStorage.removeItem(clave);
  } catch {
    return false;
  }
  return true;
};
