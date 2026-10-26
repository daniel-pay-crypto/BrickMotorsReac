import { useState, useEffect } from 'react';
import { leerAlmacen, guardarAlmacen } from '../data/almacen.js';
import { getLegoById, calcularPrecioFinal } from '../data/legosData.js';

const cargarCarrito = () => {
  const guardado = leerAlmacen('carrito', []);
  if (!Array.isArray(guardado)) {
    return [];
  }
  return guardado
    .map((item) => {
      const lego = getLegoById(item.id);
      if (!lego || lego.stock < 1) {
        return null;
      }
      return {
        id: lego.id,
        nombre: lego.nombre,
        imagen: lego.imagen,
        precio: lego.precio,
        descuento: lego.descuento || 0,
        stock: lego.stock,
        cantidad: Math.min(item.cantidad, lego.stock),
      };
    })
    .filter(Boolean);
};

export function useCarrito() {
  const [items, setItems] = useState(cargarCarrito);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    guardarAlmacen('carrito', items);
  }, [items]);

  const abrirCarrito = () => setAbierto(true);
  const cerrarCarrito = () => setAbierto(false);

  const agregar = (lego) => {
    if (lego.stock < 1) {
      return;
    }
    setItems((actuales) => {
      const existe = actuales.find((item) => item.id === lego.id);
      if (!existe) {
        return [
          ...actuales,
          {
            id: lego.id,
            nombre: lego.nombre,
            imagen: lego.imagen,
            precio: lego.precio,
            descuento: lego.descuento || 0,
            stock: lego.stock,
            cantidad: 1,
          },
        ];
      }
      return actuales.map((item) =>
        item.id === lego.id ? { ...item, cantidad: Math.min(item.cantidad + 1, item.stock) } : item
      );
    });
    setAbierto(true);
  };

  const cambiarCantidad = (id, cantidad) => {
    setItems((actuales) =>
      actuales.map((item) => {
        if (item.id !== id) {
          return item;
        }
        const nueva = Math.min(Math.max(1, Number(cantidad)), item.stock);
        return { ...item, cantidad: nueva };
      })
    );
  };

  const aumentar = (id) => {
    setItems((actuales) =>
      actuales.map((item) =>
        item.id === id ? { ...item, cantidad: Math.min(item.cantidad + 1, item.stock) } : item
      )
    );
  };

  const reducir = (id) => {
    setItems((actuales) =>
      actuales.map((item) =>
        item.id === id ? { ...item, cantidad: Math.max(item.cantidad - 1, 1) } : item
      )
    );
  };

  const eliminar = (id) => {
    setItems((actuales) => actuales.filter((item) => item.id !== id));
  };

  const vaciar = () => {
    setItems([]);
  };

  const totalItems = items.reduce((suma, item) => suma + item.cantidad, 0);
  const totalPrecio = items.reduce(
    (suma, item) => suma + calcularPrecioFinal(item.precio, item.descuento) * item.cantidad,
    0
  );

  return {
    items,
    abierto,
    totalItems,
    totalPrecio,
    abrirCarrito,
    cerrarCarrito,
    agregar,
    cambiarCantidad,
    aumentar,
    reducir,
    eliminar,
    vaciar,
  };
}
