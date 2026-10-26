import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PanelCarrito } from '../../../components/organisms/PanelCarrito';

const item = { id: 1, nombre: 'AT-ST', imagen: '/a.png', precio: 1000, descuento: 0, stock: 5, cantidad: 2 };

describe('PanelCarrito Component', () => {
  it('muestra el mensaje de carrito vacio y deshabilita vaciar', () => {
    render(<PanelCarrito />);
    expect(screen.getByText('Tu carrito está vacío.')).toBeTruthy();
    expect(screen.getByText('Total: $0')).toBeTruthy();
    expect(screen.getByText('Vaciar carrito').disabled).toBe(true);
  });

  it('muestra los productos, las unidades y el total', () => {
    render(<PanelCarrito items={[item]} totalItems={2} totalPrecio={2000} />);
    expect(screen.getByText('AT-ST')).toBeTruthy();
    expect(screen.getByText('Mi carrito (2)')).toBeTruthy();
    expect(screen.getByText('Total: $2.000')).toBeTruthy();
  });

  it('se muestra u oculta segun la prop abierto', () => {
    const { container, rerender } = render(<PanelCarrito abierto={false} />);
    expect(container.querySelector('.panel-carrito').classList.contains('activo')).toBe(false);
    rerender(<PanelCarrito abierto={true} />);
    expect(container.querySelector('.panel-carrito').classList.contains('activo')).toBe(true);
  });

  it('llama a las funciones al cerrar, eliminar y vaciar', () => {
    const onCerrar = jasmine.createSpy('onCerrar');
    const onEliminar = jasmine.createSpy('onEliminar');
    const onVaciar = jasmine.createSpy('onVaciar');
    render(
      <PanelCarrito
        items={[item]}
        totalItems={2}
        totalPrecio={2000}
        onCerrar={onCerrar}
        onEliminar={onEliminar}
        onVaciar={onVaciar}
      />
    );
    fireEvent.click(screen.getByLabelText('Cerrar carrito'));
    fireEvent.click(screen.getByText('Eliminar'));
    fireEvent.click(screen.getByText('Vaciar carrito'));
    expect(onCerrar).toHaveBeenCalled();
    expect(onEliminar).toHaveBeenCalledWith(1);
    expect(onVaciar).toHaveBeenCalled();
  });
});
