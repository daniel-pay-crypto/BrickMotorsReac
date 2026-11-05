import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TarjetaProducto } from '../../../components/molecules/TarjetaProducto';

const lego = { id: 1, nombre: 'AT-ST', imagen: '/a.png', precio: 150000, stock: 5 };

const legoConDescripcion = { ...lego, descripcion: 'Set para exhibir en tu vitrina.' };

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

  it('no muestra la descripcion hasta que se hace click en el producto', () => {
    render(<TarjetaProducto lego={legoConDescripcion} />);
    expect(screen.queryByText(legoConDescripcion.descripcion)).toBeNull();
  });

  it('muestra la descripcion y el stock al hacer click en Ver descripcion', () => {
    render(<TarjetaProducto lego={legoConDescripcion} />);
    fireEvent.click(screen.getByText('Ver descripción'));
    expect(screen.getByText(legoConDescripcion.descripcion)).toBeTruthy();
    expect(screen.getByText('Stock disponible: 5')).toBeTruthy();
  });

  it('tambien abre el detalle al hacer click en la imagen del producto', () => {
    render(<TarjetaProducto lego={legoConDescripcion} />);
    fireEvent.click(screen.getByAltText('AT-ST'));
    expect(screen.getByText(legoConDescripcion.descripcion)).toBeTruthy();
  });

  it('avisa cuando el producto no tiene descripcion', () => {
    render(<TarjetaProducto lego={lego} />);
    fireEvent.click(screen.getByText('Ver descripción'));
    expect(screen.getByText('Este producto todavía no tiene descripción.')).toBeTruthy();
  });

  it('agregar desde el detalle llama a onAgregar y cierra el detalle', async () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    render(<TarjetaProducto lego={legoConDescripcion} onAgregar={onAgregar} />);
    fireEvent.click(screen.getByText('Ver descripción'));
    const botones = screen.getAllByText('Agregar al Carrito');
    fireEvent.click(botones[botones.length - 1]);
    expect(onAgregar).toHaveBeenCalledWith(legoConDescripcion);
    await waitFor(() => expect(screen.queryByText(legoConDescripcion.descripcion)).toBeNull());
  });
});
