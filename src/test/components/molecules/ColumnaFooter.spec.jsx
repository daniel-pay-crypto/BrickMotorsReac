import React from 'react';
import { render, screen } from '@testing-library/react';
import { ColumnaFooter } from '../../../components/molecules/ColumnaFooter';

describe('ColumnaFooter Component', () => {
  it('muestra el titulo como encabezado de nivel 3', () => {
    render(<ColumnaFooter titulo="Navegación"><p>Contenido</p></ColumnaFooter>);
    expect(screen.getByRole('heading', { level: 3, name: 'Navegación' })).toBeTruthy();
  });

  it('muestra el contenido que recibe', () => {
    render(<ColumnaFooter titulo="Navegación"><p>Contenido</p></ColumnaFooter>);
    expect(screen.getByText('Contenido')).toBeTruthy();
  });

  it('usa la clase de la columna del footer', () => {
    const { container } = render(<ColumnaFooter titulo="Navegación"><p>Contenido</p></ColumnaFooter>);
    expect(container.firstChild).toHaveClass('columna-footer');
  });
});
