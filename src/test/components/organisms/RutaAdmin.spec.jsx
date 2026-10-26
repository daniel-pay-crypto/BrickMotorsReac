import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { SesionProvider } from '../../../context/SesionProvider';
import { RutaAdmin } from '../../../components/organisms/RutaAdmin';

const renderRuta = () =>
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <SesionProvider>
        <Routes>
          <Route
            path="/admin"
            element={
              <RutaAdmin>
                <p>Contenido admin</p>
              </RutaAdmin>
            }
          />
          <Route path="/login" element={<p>Pantalla login</p>} />
        </Routes>
      </SesionProvider>
    </MemoryRouter>
  );

describe('RutaAdmin Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('manda al login si no hay sesion', () => {
    renderRuta();
    expect(screen.getByText('Pantalla login')).toBeTruthy();
    expect(screen.queryByText('Contenido admin')).toBeNull();
  });

  it('bloquea a un usuario que no es administrador', () => {
    localStorage.setItem('sesion', JSON.stringify({ nombre: 'Ana', correo: 'ana@gmail.com', esAdmin: false }));
    renderRuta();
    expect(screen.getByText('Acceso restringido')).toBeTruthy();
    expect(screen.queryByText('Contenido admin')).toBeNull();
  });

  it('deja pasar al administrador', () => {
    localStorage.setItem('sesion', JSON.stringify({ nombre: 'Administrador', correo: 'admin@gmail.com', esAdmin: true }));
    renderRuta();
    expect(screen.getByText('Contenido admin')).toBeTruthy();
  });
});
