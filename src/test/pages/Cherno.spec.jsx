import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Cherno } from '../../pages/Cherno';

const renderPagina = () =>
  render(
    <MemoryRouter>
      <Cherno />
    </MemoryRouter>
  );

describe('Cherno Page', () => {
  it('renderiza la portada con el titulo del proyecto', () => {
    renderPagina();
    expect(screen.getByText('Despliega a CHERNO ALPHA para defender la costa')).toBeTruthy();
    expect(screen.getByText('PRÓXIMAMENTE')).toBeTruthy();
  });

  it('renderiza la informacion tecnica de Cherno Alpha', () => {
    renderPagina();
    expect(screen.getByText('El pináculo de la ingeniería pesada')).toBeTruthy();
    expect(screen.getByAltText('Cherno Alpha Mark-1')).toBeTruthy();
    expect(screen.getByText(/Piezas estimadas/)).toBeTruthy();
  });

  it('renderiza la seccion de animacion con el kaiju y cherno', () => {
    renderPagina();
    expect(screen.getByAltText('Kaiju recibiendo golpe')).toBeTruthy();
    expect(screen.getByAltText('Puñetazo de Cherno Alpha')).toBeTruthy();
    expect(screen.getByText('¡CHERNO ALPHA LOS ENFRENTA POR TI!')).toBeTruthy();
  });
});
