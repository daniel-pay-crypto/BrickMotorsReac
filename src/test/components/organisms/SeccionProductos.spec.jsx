import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SeccionProductos } from '../../../components/organisms/SeccionProductos';
import { getLegos } from '../../../data/legosData';

describe('SeccionProductos Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra el titulo de la seccion', () => {
    render(<SeccionProductos />);
    expect(screen.getByRole('heading', { level: 2, name: 'Productos Destacados' })).toBeTruthy();
  });

  it('muestra una tarjeta por cada producto', () => {
    render(<SeccionProductos />);
    expect(screen.getAllByText('Ver descripción').length).toBe(getLegos().length);
  });

  it('avisa cuando se agrega un producto', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    render(<SeccionProductos onAgregar={onAgregar} />);
    fireEvent.click(screen.getAllByText('Agregar al Carrito')[0]);
    expect(onAgregar).toHaveBeenCalled();
  });

  it('tiene el id productos para que el boton comprar ahora llegue hasta aqui', () => {
    const { container } = render(<SeccionProductos />);
    expect(container.querySelector('#productos')).not.toBeNull();
  });
});
