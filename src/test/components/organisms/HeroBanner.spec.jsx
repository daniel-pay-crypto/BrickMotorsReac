import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeroBanner } from '../../../components/organisms/HeroBanner';

const renderHero = () =>
  render(
    <MemoryRouter>
      <HeroBanner />
    </MemoryRouter>
  );

describe('HeroBanner Component', () => {
  it('muestra el titulo principal', () => {
    renderHero();
    expect(screen.getByRole('heading', { level: 1, name: /AT-AT SUPREMACY/ })).toBeTruthy();
  });

  it('muestra las etiquetas Novedad y Exclusivos', () => {
    renderHero();
    expect(screen.getByText('Novedad')).toBeTruthy();
    expect(screen.getByText('Exclusivos')).toBeTruthy();
  });

  it('el boton comprar ahora baja hasta la seccion de productos', () => {
    renderHero();
    expect(screen.getByText(/Comprar ahora/).getAttribute('href')).toBe('#productos');
  });

  it('el boton de novedades lleva a la pagina de productos', () => {
    renderHero();
    expect(screen.getByText(/Ver todas las novedades/).getAttribute('href')).toBe('/productos');
  });
});
