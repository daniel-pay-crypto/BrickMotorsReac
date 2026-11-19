import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SeccionProyectos } from '../../../components/organisms/SeccionProyectos';

const renderSeccion = () => render(<MemoryRouter><SeccionProyectos /></MemoryRouter>);

describe('SeccionProyectos', () => {
  it('muestra el título de proyectos destacados', () => {
    renderSeccion();
    expect(screen.getByText('Próximos proyectos de Brick Motors')).toBeTruthy();
  });

  it('muestra una tarjeta para Cherno y otra para Star Wars', () => {
    renderSeccion();
    expect(screen.getByRole('heading', { name: 'Cherno Alpha' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Estrella de la Muerte' })).toBeTruthy();
  });

  it('tiene enlaces separados a ambas páginas de proyecto', () => {
    renderSeccion();
    expect(screen.getByRole('link', { name: /Descubrir Cherno Alpha/ }).getAttribute('href')).toBe('/cherno');
    expect(screen.getByRole('link', { name: /Explorar el proyecto/ }).getAttribute('href')).toBe('/estrella-de-la-muerte');
  });
});
