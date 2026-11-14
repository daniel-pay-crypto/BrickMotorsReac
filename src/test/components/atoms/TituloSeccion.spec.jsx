import React from 'react';
import { render, screen } from '@testing-library/react';
import TituloSeccion from '../../../components/atoms/TituloSeccion';

describe('TituloSeccion Component', () => {
  it('muestra el titulo como encabezado de nivel 2', () => {
    render(<TituloSeccion>Productos</TituloSeccion>);
    expect(screen.getByRole('heading', { level: 2, name: 'Productos' })).toBeTruthy();
  });

  it('muestra el subtitulo cuando se entrega', () => {
    render(<TituloSeccion subtitulo="Elige tu set">Productos</TituloSeccion>);
    expect(screen.getByText('Elige tu set')).toBeTruthy();
  });

  it('no muestra subtitulo cuando no se entrega', () => {
    const { container } = render(<TituloSeccion>Productos</TituloSeccion>);
    expect(container.querySelector('.titulo-seccion__subtitulo')).toBeNull();
  });
});
