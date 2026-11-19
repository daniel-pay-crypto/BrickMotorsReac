import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TarjetaProyecto } from '../../../components/molecules/TarjetaProyecto';
import { proyectosDestacados } from '../../../data/proyectosDestacados';

const proyecto = proyectosDestacados[1];
const renderTarjeta = () => render(<MemoryRouter><TarjetaProyecto proyecto={proyecto} /></MemoryRouter>);

describe('TarjetaProyecto', () => {
  it('muestra el título y la descripción del proyecto', () => {
    renderTarjeta();
    expect(screen.getByText(proyecto.titulo)).toBeTruthy();
    expect(screen.getByText(proyecto.descripcion)).toBeTruthy();
  });

  it('muestra una imagen con texto alternativo', () => {
    renderTarjeta();
    expect(screen.getByAltText(proyecto.imagenAlt).getAttribute('src')).toBe(proyecto.imagen);
  });

  it('permite navegar a la página del proyecto', () => {
    renderTarjeta();
    expect(screen.getByRole('link', { name: /Explorar el proyecto/ }).getAttribute('href')).toBe(proyecto.ruta);
  });
});
