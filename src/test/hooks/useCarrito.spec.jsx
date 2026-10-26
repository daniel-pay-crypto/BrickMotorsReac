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
      <button onClick={() => agregar({ ...lego, id: 2, stock: 0 })}>Agregar sin stock</button>
      <button onClick={() => agregar({ ...lego, id: 50, precio: 1000, descuento: 20, stock: 3 })}>
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

  it('agrega un producto, suma el total y abre el panel', () => {
    render(<Consumidor />);
    expect(screen.getByText('Panel: cerrado')).toBeTruthy();
    fireEvent.click(screen.getByText('Agregar'));
    expect(screen.getByText('Unidades: 1')).toBeTruthy();
    expect(screen.getByText('Total: 1000')).toBeTruthy();
    expect(screen.getByText('Panel: abierto')).toBeTruthy();
    fireEvent.click(screen.getByText('Cerrar'));
    expect(screen.getByText('Panel: cerrado')).toBeTruthy();
  });

  it('suma unidades del mismo producto sin superar el stock', () => {
    render(<Consumidor />);
    fireEvent.click(screen.getByText('Agregar'));
    fireEvent.click(screen.getByText('Agregar'));
    fireEvent.click(screen.getByText('Agregar'));
    fireEvent.click(screen.getByText('Aumentar'));
    expect(screen.getByText('Lineas: 1')).toBeTruthy();
    expect(screen.getByText('Unidades: 2')).toBeTruthy();
  });

  it('no baja de 1 unidad al reducir y no agrega productos sin stock', () => {
    render(<Consumidor />);
    fireEvent.click(screen.getByText('Agregar sin stock'));
    expect(screen.getByText('Lineas: 0')).toBeTruthy();
    fireEvent.click(screen.getByText('Agregar'));
    fireEvent.click(screen.getByText('Reducir'));
    expect(screen.getByText('Unidades: 1')).toBeTruthy();
  });

  it('vacia el carrito', () => {
    render(<Consumidor />);
    fireEvent.click(screen.getByText('Agregar'));
    fireEvent.click(screen.getByText('Vaciar'));
    expect(screen.getByText('Unidades: 0')).toBeTruthy();
    expect(screen.getByText('Lineas: 0')).toBeTruthy();
  });

  it('calcula el total con el descuento del producto', () => {
    render(<Consumidor />);
    fireEvent.click(screen.getByText('Agregar con descuento'));
    expect(screen.getByText('Total: 800')).toBeTruthy();
  });

  it('guarda el carrito y lo recupera con el precio actual del producto', () => {
    localStorage.setItem(
      'carrito',
      JSON.stringify([
        { id: 1, nombre: 'Viejo', imagen: '/x.png', precio: 1, descuento: 0, stock: 99, cantidad: 3 },
        { id: 9999, nombre: 'Borrado', imagen: '/x.png', precio: 1, descuento: 0, stock: 5, cantidad: 1 },
      ])
    );
    render(<Consumidor />);
    expect(screen.getByText('Lineas: 1')).toBeTruthy();
    expect(screen.getByText('Unidades: 3')).toBeTruthy();
    expect(screen.getByText('Total: 450000')).toBeTruthy();
  });
});
