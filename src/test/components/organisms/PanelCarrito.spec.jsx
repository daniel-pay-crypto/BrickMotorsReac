import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CarritoProvider } from '../../../context/CarritoProvider';
import { useCarrito } from '../../../context/CarritoContext';
import { PanelCarrito } from '../../../components/organisms/PanelCarrito';

const lego = { id: 1, nombre: 'AT-ST', imagen: '/a.png', precio: 1000, stock: 5 };

function BotonAgregar() {
  const { agregar } = useCarrito();
  return <button onClick={() => agregar(lego)}>Agregar de prueba</button>;
}

const renderPanel = () =>
  render(
    <CarritoProvider>
      <BotonAgregar />
      <PanelCarrito />
    </CarritoProvider>
  );

describe('PanelCarrito Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra el mensaje de carrito vacio', () => {
    renderPanel();
    expect(screen.getByText('Tu carrito está vacío.')).toBeTruthy();
    expect(screen.getByText('Total: $0')).toBeTruthy();
  });

  it('muestra el producto agregado, el total y se abre', () => {
    const { container } = renderPanel();
    expect(container.querySelector('.panel-carrito').classList.contains('activo')).toBe(false);
    fireEvent.click(screen.getByText('Agregar de prueba'));
    expect(screen.getByText('AT-ST')).toBeTruthy();
    expect(screen.getByText('Total: $1.000')).toBeTruthy();
    expect(container.querySelector('.panel-carrito').classList.contains('activo')).toBe(true);
  });

  it('se cierra con el boton X', () => {
    const { container } = renderPanel();
    fireEvent.click(screen.getByText('Agregar de prueba'));
    fireEvent.click(screen.getByLabelText('Cerrar carrito'));
    expect(container.querySelector('.panel-carrito').classList.contains('activo')).toBe(false);
  });

  it('vacia el carrito y elimina productos', () => {
    renderPanel();
    fireEvent.click(screen.getByText('Agregar de prueba'));
    fireEvent.click(screen.getByText('Eliminar'));
    expect(screen.getByText('Tu carrito está vacío.')).toBeTruthy();
    fireEvent.click(screen.getByText('Agregar de prueba'));
    fireEvent.click(screen.getByText('Vaciar carrito'));
    expect(screen.getByText('Tu carrito está vacío.')).toBeTruthy();
  });
});
