import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from '../../../components/atoms/Logo';

const renderLogo = (props) =>
  render(
    <MemoryRouter>
      <Logo {...props} />
    </MemoryRouter>
  );

describe('Logo Component', () => {
  it('enlaza al inicio de la tienda', () => {
    renderLogo();
    expect(screen.getByLabelText('Brick Motors, ir al inicio').getAttribute('href')).toBe('/');
  });

  it('muestra el nombre de la marca', () => {
    renderLogo();
    expect(screen.getByText('Brick')).toBeTruthy();
    expect(screen.getByText('Motors')).toBeTruthy();
  });

  it('puede ocultar el texto y mostrar solo el ladrillo', () => {
    renderLogo({ mostrarTexto: false });
    expect(screen.queryByText('Brick')).toBeNull();
    expect(screen.getByLabelText('Brick Motors, ir al inicio')).toBeTruthy();
  });

  it('usa la variante clara para fondos oscuros', () => {
    renderLogo({ claro: true });
    expect(screen.getByLabelText('Brick Motors, ir al inicio')).toHaveClass('logo-marca--claro');
  });
});
