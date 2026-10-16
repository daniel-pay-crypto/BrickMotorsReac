import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminUsuarios } from '../../../components/organisms/AdminUsuarios';

describe('AdminUsuarios Component', () => {
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
});
