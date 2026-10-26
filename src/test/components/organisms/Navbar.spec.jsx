import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../../../components/organisms/Navbar';

const renderNavbar = (props = {}) =>
  render(
    <MemoryRouter>
      <Navbar {...props} />
    </MemoryRouter>
  );

const admin = { nombre: 'Administrador', correo: 'admin@gmail.com', esAdmin: true };
const cliente = { nombre: 'Ana Gómez', correo: 'ana@gmail.com', esAdmin: false };

describe('Navbar Component', () => {
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

  it('muestra el saludo y el panel admin para el admin y cierra sesion', () => {
    const onCerrarSesion = jasmine.createSpy('onCerrarSesion');
    renderNavbar({ usuario: admin, onCerrarSesion });
    expect(screen.getByText('Hola, Administrador')).toBeTruthy();
    expect(screen.getByText('Panel Admin').getAttribute('href')).toBe('/admin');
    expect(screen.queryByText('Iniciar Sesion')).toBeNull();
    fireEvent.click(screen.getByText('Cerrar sesión'));
    expect(onCerrarSesion).toHaveBeenCalled();
  });

  it('no muestra el panel admin a un cliente', () => {
    renderNavbar({ usuario: cliente });
    expect(screen.getByText('Hola, Ana')).toBeTruthy();
    expect(screen.queryByText('Panel Admin')).toBeNull();
  });

  it('muestra la cantidad del carrito y avisa al hacer click', () => {
    const onAbrirCarrito = jasmine.createSpy('onAbrirCarrito');
    renderNavbar({ cantidadCarrito: 3, onAbrirCarrito });
    expect(screen.getByText('3')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Abrir carrito'));
    expect(onAbrirCarrito).toHaveBeenCalled();
  });
});
