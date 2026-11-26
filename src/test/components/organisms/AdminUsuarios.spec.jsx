import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminUsuarios } from '../../../components/organisms/AdminUsuarios';
import { registrarUsuario } from '../../fixtures/usuariosData.js';
import { MENSAJE_NOMBRE_INVALIDO } from '../../../data/Validaciones';

describe('AdminUsuarios Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza el usuario de ejemplo en la tabla', async () => {
    render(<AdminUsuarios />);
    await screen.findByText('Juan Pérez');
    expect(await screen.findByText('Juan Pérez')).toBeTruthy();
    expect(await screen.findByText('juan@gmail.com')).toBeTruthy();
  });

  it('muestra los errores al guardar el formulario vacio', async () => {
    render(<AdminUsuarios />);
    await screen.findByText('Juan Pérez');
    fireEvent.click(screen.getByText('+ Nuevo usuario'));
    fireEvent.click(screen.getByText('Guardar usuario'));
    expect(await screen.findByText('El nombre no puede estar vacío.')).toBeTruthy();
    expect(await screen.findByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(await screen.findByText('Debes seleccionar un tipo de usuario.')).toBeTruthy();
  });

  it('agrega un usuario nuevo a la tabla con datos validos', async () => {
    render(<AdminUsuarios />);
    await screen.findByText('Juan Pérez');
    fireEvent.click(screen.getByText('+ Nuevo usuario'));
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Gómez' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'ana@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Tipo de usuario'), { target: { value: 'VENDEDOR' } });
    fireEvent.click(screen.getByText('Guardar usuario'));
    expect(await screen.findByText('ana@gmail.com')).toBeTruthy();
  });

  it('edita un usuario existente desde la tabla', async () => {
    render(<AdminUsuarios />);
    await screen.findByText('Juan Pérez');
    fireEvent.click(screen.getAllByText('Editar')[0]);
    expect(await screen.findByText('Editar usuario')).toBeTruthy();
    expect((await screen.findByLabelText('Nombre')).value).toBe('Juan Pérez');
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Juan Soto' } });
    fireEvent.change(screen.getByLabelText('Tipo de usuario'), { target: { value: 'VENDEDOR' } });
    fireEvent.click(screen.getByText('Guardar usuario'));
    expect(await screen.findByText('Juan Soto')).toBeTruthy();
    expect(screen.queryByText('Juan Pérez')).toBeNull();
    expect(await screen.findByText('VENDEDOR')).toBeTruthy();
  });

  it('muestra error si el nombre repite una letra 3 veces seguidas', async () => {
    render(<AdminUsuarios />);
    await screen.findByText('Juan Pérez');
    fireEvent.click(screen.getByText('+ Nuevo usuario'));
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'fff' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'ana@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Tipo de usuario'), { target: { value: 'VENDEDOR' } });
    fireEvent.click(screen.getByText('Guardar usuario'));
    expect(await screen.findByText(MENSAJE_NOMBRE_INVALIDO)).toBeTruthy();
    expect(screen.queryByText('ana@gmail.com')).toBeNull();
  });

  it('guarda el usuario nuevo para que siga ahi al recargar', async () => {
    render(<AdminUsuarios />);
    await screen.findByText('Juan Pérez');
    fireEvent.click(screen.getByText('+ Nuevo usuario'));
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Gómez' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'ana@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Tipo de usuario'), { target: { value: 'VENDEDOR' } });
    fireEvent.click(screen.getByText('Guardar usuario'));
    await screen.findByText('Ana Gómez');
    const guardados = JSON.parse(localStorage.getItem('personal'));
    expect(guardados.some((p) => p.correo === 'ana@gmail.com')).toBe(true);
  });

  it('muestra en la tabla los usuarios que se registraron en la tienda', async () => {
    registrarUsuario({ nombre: 'Pedro Soto', correo: 'pedro@gmail.com', contrasena: 'Clave123!' });
    render(<AdminUsuarios />);
    await screen.findByText('Juan Pérez');
    expect(await screen.findByText('Pedro Soto')).toBeTruthy();
    expect(await screen.findByText('pedro@gmail.com')).toBeTruthy();
    expect(await screen.findByText('CLIENTE')).toBeTruthy();
  });

  it('permite al administrador editar usuarios registrados', async () => {
    registrarUsuario({ nombre: 'Pedro Soto', correo: 'pedro@gmail.com', contrasena: 'Clave123!' });
    render(<AdminUsuarios />);
    await screen.findByText('Juan Pérez');
    expect((await screen.findAllByText('Editar')).length).toBe(2);
  });

  it('muestra error si el nombre tiene demasiadas consonantes juntas', async () => {
    render(<AdminUsuarios />);
    await screen.findByText('Juan Pérez');
    fireEvent.click(screen.getByText('+ Nuevo usuario'));
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Jhfdsk' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'ana@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Tipo de usuario'), { target: { value: 'VENDEDOR' } });
    fireEvent.click(screen.getByText('Guardar usuario'));
    expect(await screen.findByText(MENSAJE_NOMBRE_INVALIDO)).toBeTruthy();
  });

  it('cada casilla del formulario muestra un ejemplo de lo que va', async () => {
    render(<AdminUsuarios />);
    await screen.findByText('Juan Pérez');
    fireEvent.click(screen.getByText('+ Nuevo usuario'));
    expect(await screen.findByPlaceholderText('Ej. Juan Pérez')).toBeTruthy();
    expect(await screen.findByPlaceholderText('ejemplo@gmail.com')).toBeTruthy();
    expect(await screen.findByText('-- Selecciona un tipo (Ej. Vendedor) --')).toBeTruthy();
  });
});
