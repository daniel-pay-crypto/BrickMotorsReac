import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSesion } from '../../hooks/useSesion';

function Consumidor() {
  const { usuario, iniciarSesion, cerrarSesion } = useSesion();
  return (
    <div>
      <p>{usuario ? `Sesion de ${usuario.nombre}` : 'Sin sesion'}</p>
      <button onClick={() => iniciarSesion({ nombre: 'Ana', correo: 'ana@gmail.com', esAdmin: false })}>
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

  it('empieza sin sesion iniciada', () => {
    render(<Consumidor />);
    expect(screen.getByText('Sin sesion')).toBeTruthy();
  });

  it('inicia y cierra la sesion', () => {
    render(<Consumidor />);
    fireEvent.click(screen.getByText('Entrar'));
    expect(screen.getByText('Sesion de Ana')).toBeTruthy();
    expect(localStorage.getItem('sesion')).not.toBeNull();
    fireEvent.click(screen.getByText('Salir'));
    expect(screen.getByText('Sin sesion')).toBeTruthy();
    expect(localStorage.getItem('sesion')).toBeNull();
  });

  it('recupera la sesion guardada al cargar', () => {
    localStorage.setItem('sesion', JSON.stringify({ nombre: 'Luis', correo: 'luis@gmail.com', esAdmin: false }));
    render(<Consumidor />);
    expect(screen.getByText('Sesion de Luis')).toBeTruthy();
  });
});
