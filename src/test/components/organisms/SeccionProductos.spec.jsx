import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SeccionProductos } from '../../../components/organisms/SeccionProductos';
import { getLegos } from '../../../data/legosData';

const renderSeccion = (props = {}) =>
  render(
    <MemoryRouter>
      <SeccionProductos {...props} />
    </MemoryRouter>
  );

describe('SeccionProductos Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra el título de la sección', () => {
    renderSeccion();
    expect(screen.getByRole('heading', { level: 2, name: 'Productos Destacados' })).toBeTruthy();
  });

  it('muestra una tarjeta y un enlace a ficha por cada producto', () => {
    renderSeccion();
    expect(screen.getAllByText('Ver detalles del producto').length).toBe(getLegos().length);
  });

  it('permite agregar un producto desde el catálogo', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    renderSeccion({ onAgregar });
    fireEvent.click(screen.getAllByText('Agregar al Carrito')[0]);
    expect(onAgregar).toHaveBeenCalled();
  });

  it('tiene la sección productos para el acceso desde la portada', () => {
    const { container } = renderSeccion();
    expect(container.querySelector('#productos')).not.toBeNull();
  });
});
