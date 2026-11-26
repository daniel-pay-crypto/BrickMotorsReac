export const calcularPrecioFinal = (precio, descuento = 0) => Math.round((precio * (100 - descuento)) / 100);
