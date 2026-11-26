import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { TarjetaProducto } from '../../../components/molecules/TarjetaProducto';

const lego = { id: 1, nombre: 'AT-ST', imagen: '/a.png', precio: 150000, stock: 5 };

const renderTarjeta = (producto = lego, props = {}) =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<TarjetaProducto lego={producto} {...props} />} />
        <Route path="/products/:id" element={<h1>Ficha del producto</h1>} />
      </Routes>
    </MemoryRouter>
  );

describe('TarjetaProducto Component', () => {
  it('muestra el nombre, la imagen y el precio', () => {
    renderTarjeta();
    expect(screen.getByText('AT-ST')).toBeTruthy();
    expect(screen.getByAltText('AT-ST')).toBeTruthy();
    expect(screen.getByText('$150.000')).toBeTruthy();
  });

  it('permite agregar directamente el producto al carrito', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    renderTarjeta(lego, { onAgregar });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al Carrito' }));
    expect(onAgregar).toHaveBeenCalledWith(lego);
  });

  it('deshabilita agregar cuando el producto está agotado', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    renderTarjeta({ ...lego, stock: 0 }, { onAgregar });
    expect(screen.getByRole('button', { name: 'Sin stock' }).disabled).toBe(true);
    expect(onAgregar).not.toHaveBeenCalled();
  });

  it('muestra precio original y precio rebajado', () => {
    renderTarjeta({ ...lego, descuento: 20 });
    expect(screen.getByText('-20%')).toBeTruthy();
    expect(screen.getByText('$150.000')).toBeTruthy();
    expect(screen.getByText('$120.000')).toBeTruthy();
  });

  it('abre la ficha al hacer click en Ver detalles', () => {
    renderTarjeta();
    fireEvent.click(screen.getByRole('link', { name: 'Ver detalles del producto' }));
    expect(screen.getByRole('heading', { name: 'Ficha del producto' })).toBeTruthy();
  });

  it('abre la ficha al hacer click en la imagen', () => {
    renderTarjeta();
    fireEvent.click(screen.getByAltText('AT-ST'));
    expect(screen.getByRole('heading', { name: 'Ficha del producto' })).toBeTruthy();
  });

  it('abre la ficha al hacer click en el nombre', () => {
    renderTarjeta();
    fireEvent.click(screen.getByText('AT-ST'));
    expect(screen.getByRole('heading', { name: 'Ficha del producto' })).toBeTruthy();
  });

  it('utiliza la ruta correspondiente al identificador del producto', () => {
    renderTarjeta();
    expect(screen.getByRole('link', { name: 'Ver detalles del producto' }).getAttribute('href')).toBe('/products/1');
  });

  it('avisa cuando quedan pocas unidades', () => {
    renderTarjeta({ ...lego, stock: 2 });
    expect(screen.getByText('¡Últimas unidades!')).toBeTruthy();
  });

  it('no muestra el aviso si quedan suficientes unidades', () => {
    renderTarjeta();
    expect(screen.queryByText('¡Últimas unidades!')).toBeNull();
  });
});
