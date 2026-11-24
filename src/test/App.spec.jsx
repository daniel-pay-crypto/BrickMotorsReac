import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const renderApp = (ruta) =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>
  );

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('manda al login cuando se entra a /admin sin sesion', () => {
    renderApp('/admin');
    expect(screen.getByRole('heading', { name: 'Iniciar Sesión' })).toBeTruthy();
    expect(screen.queryByText('🧱 Brick Motors Admin')).toBeNull();
  });

  it('abre el panel de admin despues de iniciar sesion como admin', () => {
    renderApp('/login');
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'admin@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'Admin123' } });
    fireEvent.click(screen.getByText('Iniciar sesión'));
    expect(screen.getByText('🧱 Brick Motors Admin')).toBeTruthy();
    expect(screen.getByText('Panel Admin')).toBeTruthy();
  });

  it('agrega un producto al carrito desde la pagina de productos', () => {
    renderApp('/productos');
    fireEvent.click(screen.getAllByText('Agregar al Carrito')[0]);
    expect(screen.getByRole('heading', { name: 'Mi carrito' })).toBeTruthy();
    expect(screen.getByText('1 producto')).toBeTruthy();
  });

  it('muestra el anuncio superior y se puede cerrar', () => {
    renderApp('/');
    expect(screen.getByText('Nuevos sets Star Wars ya disponibles')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Cerrar anuncio'));
    expect(screen.queryByText('Nuevos sets Star Wars ya disponibles')).toBeNull();
  });
});
