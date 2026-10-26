import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TarjetaProducto } from '../../../components/molecules/TarjetaProducto';

const lego = { id: 1, nombre: 'AT-ST', imagen: '/a.png', precio: 150000, stock: 5 };

describe('TarjetaProducto Component', () => {
  it('muestra el nombre, la imagen y el precio', () => {
    render(<TarjetaProducto lego={lego} />);
    expect(screen.getByText('AT-ST')).toBeTruthy();
    expect(screen.getByAltText('AT-ST')).toBeTruthy();
    expect(screen.getByText('$150.000')).toBeTruthy();
  });

  it('llama a onAgregar con el producto al hacer click', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    render(<TarjetaProducto lego={lego} onAgregar={onAgregar} />);
    fireEvent.click(screen.getByText('Agregar al Carrito'));
    expect(onAgregar).toHaveBeenCalledWith(lego);
  });

  it('deshabilita el boton si no hay stock', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    render(<TarjetaProducto lego={{ ...lego, stock: 0 }} onAgregar={onAgregar} />);
    expect(screen.getByText('Sin stock').disabled).toBe(true);
    fireEvent.click(screen.getByText('Sin stock'));
    expect(onAgregar).not.toHaveBeenCalled();
  });

  it('muestra el precio original tachado y el precio con descuento', () => {
    render(<TarjetaProducto lego={{ ...lego, descuento: 20 }} />);
    expect(screen.getByText('-20%')).toBeTruthy();
    expect(screen.getByText('$150.000')).toBeTruthy();
    expect(screen.getByText('$120.000')).toBeTruthy();
  });
});
