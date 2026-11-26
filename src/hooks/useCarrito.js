import { useEffect, useState, useRef } from 'react';
import { api } from '../data/api.js';

export function useCarrito(usuarioId) {
  const [items, setItems] = useState([]);
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const bloqueo = useRef(false);
  const version = useRef(0);
  useEffect(() => {
    let activo = true;
    const revision = ++version.current;
    api('carrito').then(filas => {
      if (activo && revision === version.current) setItems(filas.map(({ producto, cantidad }) => ({ ...producto, cantidad })));
    }).catch(e => { if (activo) setMensaje(e.message); });
    return () => { activo = false; };
  }, [usuarioId]);

  async function modificar(ruta, metodo, datos) {
    if (bloqueo.current) return;
    bloqueo.current = true;
    const revision = ++version.current;
    setOcupado(true);
    setMensaje('');
    try {
      const resultado = await api(ruta, metodo, datos);
      if (revision !== version.current) return;
      if (ruta === 'carrito/confirmar') {
        setItems([]);
        setMensaje('Pedido #' + resultado.id + ' confirmado.');
      } else {
        setItems(resultado.map(({ producto, cantidad }) => ({ ...producto, cantidad })));
      }
    } catch (e) { setMensaje(e.message); }
    finally { bloqueo.current = false; setOcupado(false); }
  }
  const cambiarCantidad = (id, cantidad) => modificar('carrito/' + id, 'PUT', { cantidad: Number(cantidad) });
  const cantidadDe = id => items.find(item => item.id === id)?.cantidad || 0;
  return {
    items, abierto, ocupado, mensaje,
    totalItems: items.reduce((s, i) => s + i.cantidad, 0),
    totalPrecio: items.reduce((s, i) => s + i.precioFinal * i.cantidad, 0),
    abrirCarrito: () => setAbierto(true), cerrarCarrito: () => setAbierto(false),
    agregar: producto => { setAbierto(true); return cambiarCantidad(producto.id, cantidadDe(producto.id) + 1); },
    aumentar: id => cambiarCantidad(id, cantidadDe(id) + 1),
    reducir: id => cambiarCantidad(id, Math.max(1, cantidadDe(id) - 1)),
    eliminar: id => modificar('carrito/' + id, 'DELETE'),
    vaciar: () => modificar('carrito', 'DELETE'), cambiarCantidad,
    confirmar: () => modificar('carrito/confirmar', 'POST'),
  };
}
