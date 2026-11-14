import React from 'react';
import { render, screen } from '@testing-library/react';
import Etiqueta from '../../../components/atoms/Etiqueta';

describe('Etiqueta Component', () => {
  it('muestra el texto recibido', () => {
    render(<Etiqueta>Nuevo</Etiqueta>);
    expect(screen.getByText('Nuevo')).toBeTruthy();
  });

  it('usa la variante novedad por defecto', () => {
    render(<Etiqueta>Nuevo</Etiqueta>);
    expect(screen.getByText('Nuevo')).toHaveClass('etiqueta-pildora--novedad');
  });

  it('aplica la variante que recibe', () => {
    render(<Etiqueta variante="descuento">-20%</Etiqueta>);
    expect(screen.getByText('-20%')).toHaveClass('etiqueta-pildora--descuento');
  });
});
