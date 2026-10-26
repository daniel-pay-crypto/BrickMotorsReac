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
  it('renderiza el formulario de contacto', () => {
    renderPagina();
    expect(screen.getByText('Contáctanos')).toBeTruthy();
    expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();
  });

  it('renderiza los campos de nombre y mensaje con el boton de envio', () => {
    renderPagina();
    expect(screen.getByLabelText('Nombre completo')).toBeTruthy();
    expect(screen.getByLabelText('Mensaje')).toBeTruthy();
    expect(screen.getByText('Enviar mensaje')).toBeTruthy();
  });

  it('no repite el navbar ni el footer porque los pone App', () => {
    const { container } = renderPagina();
    expect(container.querySelector('header')).toBeNull();
    expect(container.querySelector('footer')).toBeNull();
  });
});
