import React from 'react';
import { render, screen } from '@testing-library/react';
import IconoCircular from '../../../components/atoms/IconoCircular';

describe('IconoCircular Component', () => {
  it('muestra el emoji recibido', () => {
    render(<IconoCircular emoji="🚀" descripcion="cohete" />);
    expect(screen.getByText('🚀')).toBeTruthy();
  });

  it('tiene rol de imagen con descripcion accesible', () => {
    render(<IconoCircular emoji="🚀" descripcion="cohete" />);
    expect(screen.getByRole('img', { name: 'cohete' })).toBeTruthy();
  });

  it('usa la clase del icono circular', () => {
    render(<IconoCircular emoji="🚀" descripcion="cohete" />);
    expect(screen.getByRole('img', { name: 'cohete' })).toHaveClass('icono-circular');
  });
});
