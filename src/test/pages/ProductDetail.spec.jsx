import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from '../../pages/ProductDetail';
import { addLego, getLegoById, updateLego } from '../fixtures/legosData.js';

const renderDetalle = (id, props = {}) =>
  render(
    <MemoryRouter initialEntries={[`/products/${id}`]}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetail {...props} />} />
        <Route path="/productos" element={<h1>Catálogo</h1>} />
      </Routes>
    </MemoryRouter>
  );

describe('ProductDetail', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra imagen, nombre, descripción y código del producto', async () => {
    renderDetalle(1);
    expect(await screen.findByRole('heading', { level: 1, name: 'Caminante AT-ST' })).toBeTruthy();
    expect(await screen.findByAltText('Caminante AT-ST')).toBeTruthy();
    expect(await screen.findByText(/Réplica del caminante AT-ST del Imperio/)).toBeTruthy();
    expect((await screen.findAllByText(/ATST-001/)).length).toBeGreaterThan(0);
  });

  it('muestra precio normal y el stock disponible', async () => {
    renderDetalle(1);
    expect(await screen.findByText('$150.000')).toBeTruthy();
    expect(await screen.findByText('Stock disponible: 5 unidades')).toBeTruthy();
  });

  it('muestra precio anterior, precio final y ahorro en productos con descuento', async () => {
    renderDetalle(8);
    expect(await screen.findByText('-20% OFF')).toBeTruthy();
    expect(await screen.findByText('$49.990')).toBeTruthy();
    expect(await screen.findByText('$39.992')).toBeTruthy();
    expect(await screen.findByText('Ahorras $9.998')).toBeTruthy();
  });

  it('agrega al carrito el producto seleccionado', async () => {
    const agregarAlCarrito = jasmine.createSpy('agregarAlCarrito');
    renderDetalle(1, { agregarAlCarrito });
    fireEvent.click(await screen.findByRole('button', { name: 'Agregar al Carrito' }));
    expect(agregarAlCarrito).toHaveBeenCalledWith(getLegoById(1));
  });

  it('bloquea la compra cuando el producto está agotado', async () => {
    updateLego(1, { stock: 0 });
    const agregarAlCarrito = jasmine.createSpy('agregarAlCarrito');
    renderDetalle(1, { agregarAlCarrito });
    expect((await screen.findByRole('button', { name: 'Producto agotado' })).disabled).toBe(true);
    expect((await screen.findAllByText('Sin stock')).length).toBeGreaterThan(0);
    expect(agregarAlCarrito).not.toHaveBeenCalled();
  });

  it('advierte cuando solo quedan dos unidades', async () => {
    renderDetalle(2);
    expect(await screen.findByText('¡Últimas unidades!')).toBeTruthy();
  });

  it('muestra un estado claro cuando el producto no existe', async () => {
    renderDetalle('99999');
    expect(await screen.findByRole('heading', { name: 'Producto no encontrado' })).toBeTruthy();
    expect((await screen.findByRole('link', { name: 'Volver al catálogo' })).getAttribute('href')).toBe('/productos');
  });

  it('muestra los productos creados desde el panel administrativo', async () => {
    const nuevo = addLego({
      codigo: 'MOC-150',
      nombre: 'Robot de prueba',
      precio: 25000,
      descuento: 10,
      stock: 3,
      categoria: 'MOC',
      descripcion: 'Construcción de prueba para la tienda.',
      imagen: '/img/legos.jpg',
    });
    renderDetalle(nuevo.id);
    expect(await screen.findByRole('heading', { name: 'Robot de prueba' })).toBeTruthy();
    expect(await screen.findByText('Construcción de prueba para la tienda.')).toBeTruthy();
    expect(await screen.findByText('$22.500')).toBeTruthy();
  });

  it('permite navegar a otro producto relacionado', async () => {
    renderDetalle(1);
    const relacionado = await screen.findByRole('link', { name: /Destructor Estelar/ });
    fireEvent.click(relacionado);
    expect(await screen.findByRole('heading', { level: 1, name: 'Destructor Estelar' })).toBeTruthy();
  });
});
