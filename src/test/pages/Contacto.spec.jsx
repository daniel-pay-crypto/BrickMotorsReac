import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Contacto } from '../../pages/Contacto';

const renderPagina = () =>
  render(
    <MemoryRouter>
      <Contacto />
    </MemoryRouter>
  );

describe('Contacto Page', () => {
  it('renderiza el navbar', () => {
    renderPagina();
    expect(screen.getByText('Inicio')).toBeTruthy();
  });

  it('renderiza el formulario de contacto', () => {
    renderPagina();
    expect(screen.getByText('Contáctanos')).toBeTruthy();
    expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();
  });

  it('renderiza el footer', () => {
    renderPagina();
    expect(screen.getByText(/brickmotors@gmail.com/)).toBeTruthy();
  });
});
