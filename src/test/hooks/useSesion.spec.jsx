import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSesion } from '../../hooks/useSesion';

function Consumidor() {
  const { usuario, iniciarSesion, cerrarSesion } = useSesion();
  return (
    <div>
      <p>{usuario ? `Sesion de ${usuario.nombre}` : 'Sin sesion'}</p>
      <button onClick={() => iniciarSesion({ correo: 'admin@gmail.com', contrasena: 'Admin123' })}>
        Entrar
      </button>
      <button onClick={cerrarSesion}>Salir</button>
    </div>
  );
}

describe('useSesion', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('empieza sin sesion iniciada', async () => {
    render(<Consumidor />);
    expect(await screen.findByText('Sin sesion')).toBeTruthy();
  });

  it('inicia y cierra la sesion', async () => {
    render(<Consumidor />);
    fireEvent.click(screen.getByText('Entrar'));
    expect(await screen.findByText('Sesion de Administrador')).toBeTruthy();
    expect(localStorage.getItem('sesion')).toBeNull();
    fireEvent.click(screen.getByText('Salir'));
    expect(await screen.findByText('Sin sesion')).toBeTruthy();
    expect(localStorage.getItem('sesion')).toBeNull();
  });

  it('descarta una sesión local no autenticada', async () => {
    localStorage.setItem('sesion', JSON.stringify({ nombre: 'Luis', correo: 'luis@gmail.com', esAdmin: false }));
    render(<Consumidor />);
    expect(await screen.findByText('Sin sesion')).toBeTruthy();
  });
});
