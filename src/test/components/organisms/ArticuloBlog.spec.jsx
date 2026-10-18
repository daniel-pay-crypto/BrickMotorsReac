import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ArticuloBlog } from '../../../components/organisms/ArticuloBlog';

const articulo = {
  id: 1,
  titulo: 'Titulo de prueba',
  fecha: 'Publicado el 1 de Enero, 2026',
  imagen: '/img/prueba.png',
  alt: 'Imagen de prueba',
  contenido: [
    { tipo: 'h2', texto: 'Subtitulo de prueba' },
    { tipo: 'p', texto: 'Parrafo de prueba' },
  ],
};

const renderArticulo = () =>
  render(
    <MemoryRouter>
      <ArticuloBlog articulo={articulo} />
    </MemoryRouter>
  );

describe('ArticuloBlog Component', () => {
  it('renderiza el titulo y la fecha del articulo', () => {
    renderArticulo();
    expect(screen.getByText(articulo.titulo)).toBeTruthy();
    expect(screen.getByText(articulo.fecha)).toBeTruthy();
  });

  it('renderiza la imagen destacada', () => {
    renderArticulo();
    const imagen = screen.getByAltText(articulo.alt);
    expect(imagen).toBeTruthy();
    expect(imagen.getAttribute('src')).toBe(articulo.imagen);
  });

  it('renderiza los subtitulos como h2 y los parrafos como p', () => {
    renderArticulo();
    expect(screen.getByText('Subtitulo de prueba').tagName).toBe('H2');
    expect(screen.getByText('Parrafo de prueba').tagName).toBe('P');
  });
});
