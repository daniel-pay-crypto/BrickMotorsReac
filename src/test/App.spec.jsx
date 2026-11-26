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

  it('manda al login cuando se entra a /admin sin sesión', async () => {
    renderApp('/admin');
    expect(await screen.findByRole('heading', { name: 'Iniciar Sesión' })).toBeTruthy();
    expect(screen.queryByText('🧱 Brick Motors Admin')).toBeNull();
  });

  it('abre el panel de administración al iniciar sesión como admin', async () => {
    renderApp('/login');
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'admin@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'Admin123' } });
    fireEvent.click(screen.getByText('Iniciar sesión'));
    expect(await screen.findByText('🧱 Brick Motors Admin')).toBeTruthy();
    expect(await screen.findByText('Panel Admin')).toBeTruthy();
  });

  it('agrega un producto al carrito desde el catálogo', async () => {
    renderApp('/productos');
    fireEvent.click((await screen.findAllByText('Agregar al Carrito'))[0]);
    expect(await screen.findByRole('heading', { name: 'Mi carrito' })).toBeTruthy();
    expect(await screen.findByText('1 producto')).toBeTruthy();
  });

  it('abre el detalle del producto desde el catálogo y permite agregar al carrito', async () => {
    renderApp('/productos');
    fireEvent.click((await screen.findAllByText('Ver detalles del producto'))[0]);
    expect(await screen.findByRole('heading', { level: 1, name: 'Caminante AT-ST' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al Carrito' }));
    expect(await screen.findByRole('heading', { name: 'Mi carrito' })).toBeTruthy();
    expect(await screen.findByText('1 producto')).toBeTruthy();
  });

  it('muestra el anuncio superior y permite cerrarlo', async () => {
    renderApp('/');
    expect(await screen.findByText('Nuevos sets Star Wars ya disponibles')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Cerrar anuncio'));
    expect(screen.queryByText('Nuevos sets Star Wars ya disponibles')).toBeNull();
  });
});
