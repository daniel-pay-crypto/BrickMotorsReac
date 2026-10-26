import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RutaAdmin } from '../../../components/organisms/RutaAdmin';

const renderRuta = (usuario) =>
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route
          path="/admin"
          element={
            <RutaAdmin usuario={usuario}>
              <p>Contenido admin</p>
            </RutaAdmin>
          }
        />
        <Route path="/login" element={<p>Pantalla login</p>} />
      </Routes>
    </MemoryRouter>
  );

describe('RutaAdmin Component', () => {
  it('manda al login si no hay sesion', () => {
    renderRuta(null);
    expect(screen.getByText('Pantalla login')).toBeTruthy();
    expect(screen.queryByText('Contenido admin')).toBeNull();
  });

  it('bloquea a un usuario que no es administrador', () => {
    renderRuta({ nombre: 'Ana', correo: 'ana@gmail.com', esAdmin: false });
    expect(screen.getByText('Acceso restringido')).toBeTruthy();
    expect(screen.queryByText('Contenido admin')).toBeNull();
  });

  it('deja pasar al administrador', () => {
    renderRuta({ nombre: 'Administrador', correo: 'admin@gmail.com', esAdmin: true });
    expect(screen.getByText('Contenido admin')).toBeTruthy();
  });
});
