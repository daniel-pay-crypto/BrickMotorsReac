import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCarrito } from '../../hooks/useCarrito';

const lego = { id: 1, nombre: 'AT-ST', imagen: '/a.png', precio: 1000, stock: 2 };

function Consumidor() {
  const { items, totalItems, totalPrecio, abierto, agregar, aumentar, reducir, vaciar, cerrarCarrito } = useCarrito();
  return (
    <div>
      <p>Unidades: {totalItems}</p>
      <p>Total: {totalPrecio}</p>
      <p>Lineas: {items.length}</p>
      <p>Panel: {abierto ? 'abierto' : 'cerrado'}</p>
      <button onClick={() => agregar(lego)}>Agregar</button>
      <button onClick={() => agregar({ ...lego, id: 99999, stock: 0 })}>Agregar sin stock</button>
      <button onClick={() => agregar({ ...lego, id: 8, precio: 1000, descuento: 20, stock: 3 })}>
        Agregar con descuento
      </button>
      <button onClick={() => aumentar(1)}>Aumentar</button>
      <button onClick={() => reducir(1)}>Reducir</button>
      <button onClick={vaciar}>Vaciar</button>
      <button onClick={cerrarCarrito}>Cerrar</button>
    </div>
  );
}

describe('useCarrito', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('agrega un producto, suma el total y abre el panel', async () => {
    render(<Consumidor />);
    expect(await screen.findByText('Panel: cerrado')).toBeTruthy();
    fireEvent.click(screen.getByText('Agregar'));
    expect(await screen.findByText('Unidades: 1')).toBeTruthy();
    expect(await screen.findByText('Total: 150000')).toBeTruthy();
    expect(await screen.findByText('Panel: abierto')).toBeTruthy();
    fireEvent.click(screen.getByText('Cerrar'));
    expect(await screen.findByText('Panel: cerrado')).toBeTruthy();
  });

  it('suma unidades del mismo producto sin superar el stock', async () => {
    render(<Consumidor />);
    fireEvent.click(screen.getByText('Agregar'));
    await screen.findByText('Unidades: 1');
    fireEvent.click(screen.getByText('Agregar'));
    fireEvent.click(screen.getByText('Agregar'));
    fireEvent.click(screen.getByText('Aumentar'));
    expect(await screen.findByText('Lineas: 1')).toBeTruthy();
    expect(await screen.findByText('Unidades: 2')).toBeTruthy();
  });

  it('no baja de 1 unidad al reducir y no agrega productos sin stock', async () => {
    render(<Consumidor />);
    fireEvent.click(screen.getByText('Agregar sin stock'));
    expect(await screen.findByText('Lineas: 0')).toBeTruthy();
    fireEvent.click(screen.getByText('Agregar'));
    fireEvent.click(screen.getByText('Reducir'));
    expect(await screen.findByText('Unidades: 1')).toBeTruthy();
  });

  it('vacia el carrito', async () => {
    render(<Consumidor />);
    fireEvent.click(screen.getByText('Agregar'));
    await screen.findByText('Unidades: 1');
    fireEvent.click(screen.getByText('Vaciar'));
    expect(await screen.findByText('Unidades: 0')).toBeTruthy();
    expect(await screen.findByText('Lineas: 0')).toBeTruthy();
  });

  it('calcula el total con el descuento del producto', async () => {
    render(<Consumidor />);
    fireEvent.click(screen.getByText('Agregar con descuento'));
    expect(await screen.findByText('Total: 39992')).toBeTruthy();
  });

  it('carga el carrito desde la API e ignora los precios guardados en el navegador', async () => {
    localStorage.setItem(
      'carrito',
      JSON.stringify([
        { id: 1, nombre: 'Viejo', imagen: '/x.png', precio: 1, descuento: 0, stock: 99, cantidad: 3 },
        { id: 9999, nombre: 'Borrado', imagen: '/x.png', precio: 1, descuento: 0, stock: 5, cantidad: 1 },
      ])
    );
    render(<Consumidor />);
    expect(await screen.findByText('Unidades: 0')).toBeTruthy();
    expect(window.fetch).toHaveBeenCalledWith('/api/v1/carrito', jasmine.any(Object));
  });
});
