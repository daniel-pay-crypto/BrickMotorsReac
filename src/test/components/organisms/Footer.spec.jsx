import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../../../components/organisms/Footer';

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

describe('Footer Component', () => {
  it('muestra el logo de la tienda con enlace al inicio', () => {
    renderFooter();
    expect(screen.getByLabelText('Brick Motors, ir al inicio').getAttribute('href')).toBe('/');
  });

  it('muestra los enlaces de navegacion', () => {
    renderFooter();
    expect(screen.getByText('Productos').getAttribute('href')).toBe('/productos');
    expect(screen.getByText('Contacto').getAttribute('href')).toBe('/contacto');
    expect(screen.getByText('Cherno').getAttribute('href')).toBe('/cherno');
  });

  it('muestra el correo de contacto con enlace mailto', () => {
    renderFooter();
    expect(screen.getByText('brickmotors@gmail.com').getAttribute('href')).toBe('mailto:brickmotors@gmail.com');
  });

  it('muestra el enlace a TikTok', () => {
    renderFooter();
    expect(screen.getByAltText('Síguenos en TikTok').closest('a').getAttribute('href')).toContain('tiktok.com');
  });

  it('muestra los derechos reservados', () => {
    renderFooter();
    expect(screen.getByText(/Todos los derechos reservados/)).toBeTruthy();
  });
});
