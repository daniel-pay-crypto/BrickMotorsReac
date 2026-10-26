import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../../../components/organisms/Navbar';
import { SesionProvider } from '../../../context/SesionProvider';
import { CarritoProvider } from '../../../context/CarritoProvider';
import { useCarrito } from '../../../context/CarritoContext';

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

const renderConSesion = (usuario) => {
  localStorage.setItem('sesion', JSON.stringify(usuario));
  return render(
    <MemoryRouter>
      <SesionProvider>
        <CarritoProvider>
          <BotonAgregar />
          <Navbar />
        </CarritoProvider>
      </SesionProvider>
    </MemoryRouter>
  );
};

function BotonAgregar() {
  const { agregar } = useCarrito();
  return (
    <button onClick={() => agregar({ id: 1, nombre: 'AT-ST', imagen: '/a.png', precio: 1000, stock: 5 })}>
      Agregar de prueba
    </button>
  );
}

describe('Navbar Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza los enlaces del menu', () => {
    renderNavbar();
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Productos')).toBeTruthy();
    expect(screen.getByText('Contacto')).toBeTruthy();
  });

  it('renderiza los enlaces de iniciar sesion y registrarse', () => {
    renderNavbar();
    expect(screen.getByText('Iniciar Sesion').getAttribute('href')).toBe('/login');
    expect(screen.getByText('Registrarse').getAttribute('href')).toBe('/registro');
  });

  it('abre el menu con la hamburguesa y lo cierra al elegir un enlace', () => {
    const { container } = renderNavbar();
    const menu = container.querySelector('#menu');
    expect(menu.classList.contains('activo')).toBe(false);
    fireEvent.click(screen.getByLabelText('Abrir menú'));
    expect(menu.classList.contains('activo')).toBe(true);
    fireEvent.click(screen.getByText('Blog'));
    expect(menu.classList.contains('activo')).toBe(false);
  });

  it('muestra el saludo, el panel admin y cerrar sesion para el admin', () => {
    renderConSesion({ nombre: 'Administrador', correo: 'admin@gmail.com', esAdmin: true });
    expect(screen.getByText('Hola, Administrador')).toBeTruthy();
    expect(screen.getByText('Panel Admin').getAttribute('href')).toBe('/admin');
    expect(screen.queryByText('Iniciar Sesion')).toBeNull();
    fireEvent.click(screen.getByText('Cerrar sesión'));
    expect(screen.getByText('Iniciar Sesion')).toBeTruthy();
    expect(screen.queryByText('Panel Admin')).toBeNull();
  });

  it('no muestra el panel admin a un cliente', () => {
    renderConSesion({ nombre: 'Ana Gómez', correo: 'ana@gmail.com', esAdmin: false });
    expect(screen.getByText('Hola, Ana')).toBeTruthy();
    expect(screen.queryByText('Panel Admin')).toBeNull();
  });

  it('muestra la cantidad de productos en el icono del carrito', () => {
    renderConSesion({ nombre: 'Ana Gómez', correo: 'ana@gmail.com', esAdmin: false });
    expect(screen.queryByText('1')).toBeNull();
    fireEvent.click(screen.getByText('Agregar de prueba'));
    expect(screen.getByText('1')).toBeTruthy();
  });
});
