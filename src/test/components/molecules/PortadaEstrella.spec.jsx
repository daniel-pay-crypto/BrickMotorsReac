import React from 'react';
import { render, screen } from '@testing-library/react';
import { PortadaEstrella } from '../../../components/molecules/PortadaEstrella';

describe('PortadaEstrella', () => {
  it('muestra título, introducción breve e imagen conceptual', () => {
    render(<PortadaEstrella />);
    expect(screen.getByRole('heading', { level: 1, name: 'Estrella de la Muerte' })).toBeTruthy();
    expect(screen.getByText(/Una estación espacial legendaria/)).toBeTruthy();
    expect(screen.getByAltText(/Ilustración conceptual/)).toBeTruthy();
  });

  it('lleva a la descripción detallada dentro de la página', () => {
    render(<PortadaEstrella />);
    expect(screen.getByRole('link', { name: /Descubrir la construcción/ }).getAttribute('href')).toBe('#detalles-estrella');
  });
});
