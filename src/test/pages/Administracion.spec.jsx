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
  it('renderiza el titulo del panel', async () => {
    renderPagina();
    expect(await screen.findByText('🧱 Brick Motors Admin')).toBeTruthy();
  });

  it('muestra la tabla de productos por defecto', async () => {
    renderPagina();
    expect(await screen.findByText('AT-AT Supremacy')).toBeTruthy();
  });

  it('renderiza el enlace para volver a la tienda', async () => {
    renderPagina();
    expect(await screen.findByText('⬅ Volver a la tienda')).toBeTruthy();
  });
});
