import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DetalleBlog } from '../../pages/DetalleBlog';
import { articulosBlog } from '../../data/blogData';

const renderPagina = (ruta) =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/blog/:id" element={<DetalleBlog />} />
      </Routes>
    </MemoryRouter>
  );

describe('DetalleBlog Page', () => {
  it('renderiza el articulo que corresponde al id de la ruta', () => {
    renderPagina('/blog/2');
    expect(screen.getByText(articulosBlog[2].titulo)).toBeTruthy();
  });

  it('actualiza el titulo del documento con el titulo del articulo', () => {
    renderPagina('/blog/3');
    expect(document.title).toBe(`${articulosBlog[3].titulo} - Brick Motors`);
  });

  it('muestra el primer articulo cuando el id no existe', () => {
    renderPagina('/blog/999');
    expect(screen.getByText(articulosBlog[1].titulo)).toBeTruthy();
  });
});
