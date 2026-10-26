import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CarritoProvider } from '../../../context/CarritoProvider';
import { useCarrito } from '../../../context/CarritoContext';
import { TarjetaProducto } from '../../../components/molecules/TarjetaProducto';

const lego = { id: 1, nombre: 'AT-ST', imagen: '/a.png', precio: 150000, stock: 5 };

function Contador() {
  const { cantidadTotal } = useCarrito();
  return <p>En el carrito: {cantidadTotal}</p>;
}

const renderTarjeta = (props = lego) =>
  render(
    <CarritoProvider>
      <TarjetaProducto lego={props} />
      <Contador />
    </CarritoProvider>
  );

describe('TarjetaProducto Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra el nombre, la imagen y el precio', () => {
    renderTarjeta();
    expect(screen.getByText('AT-ST')).toBeTruthy();
    expect(screen.getByAltText('AT-ST')).toBeTruthy();
    expect(screen.getByText('$150.000')).toBeTruthy();
  });

  it('agrega el producto al carrito', () => {
    renderTarjeta();
    fireEvent.click(screen.getByText('Agregar al Carrito'));
    expect(screen.getByText('En el carrito: 1')).toBeTruthy();
  });

  it('deshabilita el boton si no hay stock', () => {
    renderTarjeta({ ...lego, stock: 0 });
    expect(screen.getByText('Sin stock').disabled).toBe(true);
    expect(screen.getByText('En el carrito: 0')).toBeTruthy();
  });

  it('muestra el precio original tachado y el precio con descuento', () => {
    renderTarjeta({ ...lego, descuento: 20 });
    expect(screen.getByText('-20%')).toBeTruthy();
    expect(screen.getByText('$150.000')).toBeTruthy();
    expect(screen.getByText('$120.000')).toBeTruthy();
  });
});
