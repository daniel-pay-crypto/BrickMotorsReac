import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Administracion } from '../../pages/Administracion';

const renderPagina = () =>
  render(
    <MemoryRouter>
      <Administracion />
    </MemoryRouter>
  );

describe('Administracion Page', () => {
  it('renderiza el titulo del panel', () => {
    renderPagina();
    expect(screen.getByText('🧱 Brick Motors Admin')).toBeTruthy();
  });

  it('muestra la tabla de productos por defecto', () => {
    renderPagina();
    expect(screen.getByText('AT-AT Supremacy')).toBeTruthy();
  });

  it('renderiza el enlace para volver a la tienda', () => {
    renderPagina();
    expect(screen.getByText('⬅ Volver a la tienda')).toBeTruthy();
  });
});
