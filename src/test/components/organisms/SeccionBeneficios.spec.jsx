import React from 'react';
import { render, screen } from '@testing-library/react';
import { SeccionBeneficios } from '../../../components/organisms/SeccionBeneficios';
import { beneficios } from '../../../data/beneficiosData';

describe('SeccionBeneficios Component', () => {
  it('muestra el titulo de la seccion', () => {
    render(<SeccionBeneficios />);
    expect(screen.getByText('¿Por qué Brick Motors?')).toBeTruthy();
  });

  it('muestra una tarjeta por cada beneficio', () => {
    render(<SeccionBeneficios />);
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(beneficios.length);
  });

  it('muestra el titulo y el texto de cada beneficio', () => {
    render(<SeccionBeneficios />);
    beneficios.forEach((beneficio) => {
      expect(screen.getByText(beneficio.titulo)).toBeTruthy();
      expect(screen.getByText(beneficio.texto)).toBeTruthy();
    });
  });
});
