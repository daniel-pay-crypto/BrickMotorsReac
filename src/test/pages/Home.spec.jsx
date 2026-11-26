
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';

const renderHome = () => {
  return render(
    <MemoryRouter>
      <Home agregarAlCarrito={() => {}} />
    </MemoryRouter>
  );
};

describe('Home Page', () => {

  it('renderiza el titulo de bienvenida', async () => {
    renderHome();

    expect(
      screen.getByRole('heading', {
        name: /BIENVENIDO A NUESTRA TIENDA OFICIAL DE BRICK MOTORS/i
      })
    ).toBeTruthy();
  });

  it('renderiza el texto de bienvenida', async () => {
    renderHome();

    expect(
      screen.getByText(/Aquí encontrarás todo lo necesario para romper los limites/i)
    ).toBeTruthy();
  });

  it('renderiza la seccion de beneficios', async () => {
    renderHome();

    expect(
      screen.getByText('¿Por qué Brick Motors?')
    ).toBeTruthy();
  });

  it('renderiza la seccion de proyectos', async () => {
    renderHome();

    expect(
      screen.getByRole('heading', {
        name: 'Próximos proyectos de Brick Motors'
      })
    ).toBeTruthy();

    expect(
      screen.getByRole('heading', { name: 'Cherno Alpha' })
    ).toBeTruthy();

    expect(
      screen.getByRole('heading', { name: 'Estrella de la Muerte' })
    ).toBeTruthy();
  });

  it('permite acceder a los proyectos', async () => {
    renderHome();

    expect(
      screen.getByRole('link', { name: /Descubrir Cherno Alpha/i })
        .getAttribute('href')
    ).toBe('/cherno');

    expect(
      screen.getByRole('link', { name: /Explorar el proyecto/i })
        .getAttribute('href')
    ).toBe('/estrella-de-la-muerte');
  });

  it('renderiza la seccion de productos', async () => {
    renderHome();

    expect(
      screen.getByRole('heading', {
        name: '¡Explora Nuestros Productos!'
      })
    ).toBeTruthy();
  });

  it('renderiza la seccion de Star Wars', async () => {
    renderHome();

    expect(
      screen.getByRole('heading', {
        name: '¿Te atreves a conquistar la galaxia?'
      })
    ).toBeTruthy();

    expect(
      screen.getByRole('link', {
        name: /Descubrir la colección/i
      }).getAttribute('href')
    ).toBe('/productos');
  });

});
