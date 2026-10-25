import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Registro } from '../../pages/Registro';

const renderPagina = () =>
  render(
    <MemoryRouter>
      <Registro />
    </MemoryRouter>
  );

describe('Registro Page', () => {
  it('renderiza el titulo de la pagina', () => {
    renderPagina();
    expect(screen.getByText('Crear Cuenta')).toBeTruthy();
  });

  it('renderiza el formulario de registro', () => {
    renderPagina();
    expect(screen.getByLabelText('Nombre completo')).toBeTruthy();
    expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();
    expect(screen.getByLabelText('Contraseña')).toBeTruthy();
  });
});
