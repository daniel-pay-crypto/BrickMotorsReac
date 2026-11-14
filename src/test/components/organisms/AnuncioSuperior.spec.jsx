import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AnuncioSuperior } from '../../../components/organisms/AnuncioSuperior';

const renderAnuncio = (props) =>
  render(
    <MemoryRouter>
      <AnuncioSuperior {...props} />
    </MemoryRouter>
  );

describe('AnuncioSuperior Component', () => {
  it('muestra el mensaje y la etiqueta por defecto', () => {
    renderAnuncio();
    expect(screen.getByText('Nuevo')).toBeTruthy();
    expect(screen.getByText('Nuevos sets Star Wars ya disponibles')).toBeTruthy();
  });

  it('enlaza a la pagina de productos', () => {
    renderAnuncio();
    expect(screen.getByText('Míralos aquí').getAttribute('href')).toBe('/productos');
  });

  it('se oculta al hacer click en cerrar', () => {
    renderAnuncio();
    fireEvent.click(screen.getByLabelText('Cerrar anuncio'));
    expect(screen.queryByText('Nuevos sets Star Wars ya disponibles')).toBeNull();
  });

  it('muestra el mensaje y el enlace que recibe', () => {
    renderAnuncio({ mensaje: 'Llegó Cherno Alpha', enlace: '/cherno', textoEnlace: 'Descúbrelo' });
    expect(screen.getByText('Llegó Cherno Alpha')).toBeTruthy();
    expect(screen.getByText('Descúbrelo').getAttribute('href')).toBe('/cherno');
  });
});
