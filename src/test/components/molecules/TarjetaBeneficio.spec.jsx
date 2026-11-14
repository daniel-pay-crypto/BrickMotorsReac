import React from 'react';
import { render, screen } from '@testing-library/react';
import { TarjetaBeneficio } from '../../../components/molecules/TarjetaBeneficio';

const props = { icono: '💬', titulo: 'Escríbenos', texto: 'Mándanos un mensaje.' };

describe('TarjetaBeneficio Component', () => {
  it('muestra el titulo como encabezado de nivel 3', () => {
    render(<TarjetaBeneficio {...props} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Escríbenos' })).toBeTruthy();
  });

  it('muestra el texto del beneficio', () => {
    render(<TarjetaBeneficio {...props} />);
    expect(screen.getByText('Mándanos un mensaje.')).toBeTruthy();
  });

  it('muestra el icono con el titulo como descripcion accesible', () => {
    render(<TarjetaBeneficio {...props} />);
    expect(screen.getByRole('img', { name: 'Escríbenos' })).toBeTruthy();
    expect(screen.getByText('💬')).toBeTruthy();
  });
});
