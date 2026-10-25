import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../../../components/organisms/Navbar';

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

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
});
