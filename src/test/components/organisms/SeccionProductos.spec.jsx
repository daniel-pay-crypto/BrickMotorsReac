import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SeccionProductos } from '../../../components/organisms/SeccionProductos';
import { getLegos } from '../../fixtures/legosData.js';

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

  it('muestra el título de la sección', async () => {
    renderSeccion();
    expect(await screen.findByRole('heading', { level: 2, name: 'Productos Destacados' })).toBeTruthy();
  });

  it('muestra una tarjeta y un enlace a ficha por cada producto', async () => {
    renderSeccion();
    expect((await screen.findAllByText('Ver detalles del producto')).length).toBe(getLegos().length);
  });

  it('permite agregar un producto desde el catálogo', async () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    renderSeccion({ onAgregar });
    fireEvent.click((await screen.findAllByText('Agregar al Carrito'))[0]);
    expect(onAgregar).toHaveBeenCalled();
  });

  it('tiene la sección productos para el acceso desde la portada', async () => {
    const { container } = renderSeccion();
    expect(container.querySelector('#productos')).not.toBeNull();
  });
});
