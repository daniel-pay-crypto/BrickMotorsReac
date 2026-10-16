import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PanelAdmin } from '../../../components/organisms/PanelAdmin';

const renderPanel = () =>
  render(
    <MemoryRouter>
      <PanelAdmin />
    </MemoryRouter>
  );

describe('PanelAdmin Component', () => {
  it('renderiza el menu lateral', () => {
    renderPanel();
    expect(screen.getByText('⬅ Volver a la tienda')).toBeTruthy();
    expect(screen.getByText('📦 Productos')).toBeTruthy();
    expect(screen.getByText('👤 Usuarios')).toBeTruthy();
  });

  it('muestra la seccion de productos por defecto', () => {
    renderPanel();
    expect(screen.getByText('Productos')).toBeTruthy();
    expect(screen.queryByText('Usuarios')).toBeNull();
  });

  it('cambia a la seccion de usuarios al hacer click en el menu', () => {
    renderPanel();
    fireEvent.click(screen.getByText('👤 Usuarios'));
    expect(screen.getByText('Usuarios')).toBeTruthy();
    expect(screen.queryByText('Productos')).toBeNull();
  });
});
