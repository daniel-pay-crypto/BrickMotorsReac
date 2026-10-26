import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminUsuarios } from '../../../components/organisms/AdminUsuarios';

describe('AdminUsuarios Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza el usuario de ejemplo en la tabla', () => {
    render(<AdminUsuarios />);
    expect(screen.getByText('Juan Pérez')).toBeTruthy();
    expect(screen.getByText('juan@gmail.com')).toBeTruthy();
  });

  it('muestra los errores al guardar el formulario vacio', () => {
    render(<AdminUsuarios />);
    fireEvent.click(screen.getByText('+ Nuevo usuario'));
    fireEvent.click(screen.getByText('Guardar usuario'));
    expect(screen.getByText('El nombre no puede estar vacío.')).toBeTruthy();
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.getByText('Debes seleccionar un tipo de usuario.')).toBeTruthy();
  });

  it('agrega un usuario nuevo a la tabla con datos validos', () => {
    render(<AdminUsuarios />);
    fireEvent.click(screen.getByText('+ Nuevo usuario'));
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Gómez' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'ana@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Tipo de usuario'), { target: { value: 'Vendedor' } });
    fireEvent.click(screen.getByText('Guardar usuario'));
    expect(screen.getByText('ana@gmail.com')).toBeTruthy();
  });

  it('edita un usuario existente desde la tabla', () => {
    render(<AdminUsuarios />);
    fireEvent.click(screen.getAllByText('Editar')[0]);
    expect(screen.getByText('Editar usuario')).toBeTruthy();
    expect(screen.getByLabelText('Nombre').value).toBe('Juan Pérez');
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Juan Soto' } });
    fireEvent.change(screen.getByLabelText('Tipo de usuario'), { target: { value: 'Vendedor' } });
    fireEvent.click(screen.getByText('Guardar usuario'));
    expect(screen.getByText('Juan Soto')).toBeTruthy();
    expect(screen.queryByText('Juan Pérez')).toBeNull();
    expect(screen.getByText('Vendedor')).toBeTruthy();
  });

  it('muestra error si el nombre repite una letra 3 veces seguidas', () => {
    render(<AdminUsuarios />);
    fireEvent.click(screen.getByText('+ Nuevo usuario'));
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'fff' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'ana@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Tipo de usuario'), { target: { value: 'Vendedor' } });
    fireEvent.click(screen.getByText('Guardar usuario'));
    expect(screen.getByText('Ingresa un nombre válido: solo letras y sin repetir una letra 3 veces seguidas.')).toBeTruthy();
    expect(screen.queryByText('ana@gmail.com')).toBeNull();
  });

  it('guarda el usuario nuevo para que siga ahi al recargar', () => {
    render(<AdminUsuarios />);
    fireEvent.click(screen.getByText('+ Nuevo usuario'));
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Gómez' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'ana@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Tipo de usuario'), { target: { value: 'Vendedor' } });
    fireEvent.click(screen.getByText('Guardar usuario'));
    const guardados = JSON.parse(localStorage.getItem('personal'));
    expect(guardados.some((p) => p.correo === 'ana@gmail.com')).toBe(true);
  });
});
