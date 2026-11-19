import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BitacoraEstrella } from '../../../components/organisms/BitacoraEstrella';

const renderBitacora = () => render(<MemoryRouter><BitacoraEstrella /></MemoryRouter>);

describe('BitacoraEstrella', () => {
  it('muestra piezas, dimensiones y estado sin cifras inventadas', () => {
    renderBitacora();
    expect(screen.getByText('Cantidad de piezas')).toBeTruthy();
    expect(screen.getByText('Dimensiones')).toBeTruthy();
    expect(screen.getAllByText('Por definir').length).toBe(2);
  });

  it('permite desplegar las descripciones de las tres fases', () => {
    const { container } = renderBitacora();
    expect(container.querySelectorAll('details').length).toBe(3);
    const primeraFase = screen.getByText('Diseño y planificación');
    fireEvent.click(primeraFase);
    expect(container.querySelector('details').open).toBe(true);
    expect(screen.getByText(/dividir el modelo en sectores/)).toBeTruthy();
  });

  it('mantiene el enlace al catálogo sin presentar este concepto como producto', () => {
    renderBitacora();
    expect(screen.getByRole('link', { name: /Explorar la colección Star Wars/ }).getAttribute('href')).toBe('/productos');
  });
});
