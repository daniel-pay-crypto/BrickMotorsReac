import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Login } from '../../pages/Login';

const renderPagina = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe('Login Page', () => {
  it('renderiza el titulo de la pagina', () => {
    renderPagina();
    expect(screen.getByRole('heading', { name: 'Iniciar Sesión' })).toBeTruthy();
  });

  it('renderiza el formulario de inicio de sesion', () => {
    renderPagina();
    expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();
    expect(screen.getByLabelText('Contraseña')).toBeTruthy();
  });
});
