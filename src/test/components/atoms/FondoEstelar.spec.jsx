import React from 'react';
import { render } from '@testing-library/react';
import { FondoEstelar } from '../../../components/atoms/FondoEstelar';

describe('FondoEstelar', () => {
  it('crea capas decorativas invisibles para tecnologías asistivas', () => {
    const { container } = render(<FondoEstelar />);
    const fondo = container.querySelector('.fondo-estelar');
    expect(fondo).toBeTruthy();
    expect(fondo.getAttribute('aria-hidden')).toBe('true');
    expect(fondo.querySelectorAll('.fondo-estelar__estrellas').length).toBe(2);
  });
});
