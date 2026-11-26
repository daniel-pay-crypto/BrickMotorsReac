import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from '../../pages/ProductDetail';
import { addLego, getLegoById, updateLego } from '../../data/legosData';

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

  it('muestra imagen, nombre, descripción y código del producto', () => {
    renderDetalle(1);
    expect(screen.getByRole('heading', { level: 1, name: 'Caminante AT-ST' })).toBeTruthy();
    expect(screen.getByAltText('Caminante AT-ST')).toBeTruthy();
    expect(screen.getByText(/Réplica del caminante AT-ST del Imperio/)).toBeTruthy();
    expect(screen.getAllByText(/ATST-001/).length).toBeGreaterThan(0);
  });

  it('muestra precio normal y el stock disponible', () => {
    renderDetalle(1);
    expect(screen.getByText('$150.000')).toBeTruthy();
    expect(screen.getByText('Stock disponible: 5 unidades')).toBeTruthy();
  });

  it('muestra precio anterior, precio final y ahorro en productos con descuento', () => {
    renderDetalle(8);
    expect(screen.getByText('-20% OFF')).toBeTruthy();
    expect(screen.getByText('$49.990')).toBeTruthy();
    expect(screen.getByText('$39.992')).toBeTruthy();
    expect(screen.getByText('Ahorras $9.998')).toBeTruthy();
  });

  it('agrega al carrito el producto seleccionado', () => {
    const agregarAlCarrito = jasmine.createSpy('agregarAlCarrito');
    renderDetalle(1, { agregarAlCarrito });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al Carrito' }));
    expect(agregarAlCarrito).toHaveBeenCalledWith(getLegoById(1));
  });

  it('bloquea la compra cuando el producto está agotado', () => {
    updateLego(1, { stock: 0 });
    const agregarAlCarrito = jasmine.createSpy('agregarAlCarrito');
    renderDetalle(1, { agregarAlCarrito });
    expect(screen.getByRole('button', { name: 'Producto agotado' }).disabled).toBe(true);
    expect(screen.getAllByText('Sin stock').length).toBeGreaterThan(0);
    expect(agregarAlCarrito).not.toHaveBeenCalled();
  });

  it('advierte cuando solo quedan dos unidades', () => {
    renderDetalle(2);
    expect(screen.getByText('¡Últimas unidades!')).toBeTruthy();
  });

  it('muestra un estado claro cuando el producto no existe', () => {
    renderDetalle('99999');
    expect(screen.getByRole('heading', { name: 'Producto no encontrado' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Volver al catálogo' }).getAttribute('href')).toBe('/productos');
  });

  it('muestra los productos creados desde el panel administrativo', () => {
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
    expect(screen.getByRole('heading', { name: 'Robot de prueba' })).toBeTruthy();
    expect(screen.getByText('Construcción de prueba para la tienda.')).toBeTruthy();
    expect(screen.getByText('$22.500')).toBeTruthy();
  });

  it('permite navegar a otro producto relacionado', () => {
    renderDetalle(1);
    const relacionado = screen.getByRole('link', { name: /Destructor Estelar/ });
    fireEvent.click(relacionado);
    expect(screen.getByRole('heading', { level: 1, name: 'Destructor Estelar' })).toBeTruthy();
  });
});
