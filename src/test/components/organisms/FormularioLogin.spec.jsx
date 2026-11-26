import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { registrarUsuario } from '../../fixtures/usuariosData.js';
import { FormularioLogin } from '../../../components/organisms/FormularioLogin';

const renderFormulario = (onIniciarSesion) =>
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<FormularioLogin onIniciarSesion={onIniciarSesion} />} />
        <Route path="/admin" element={<p>Pantalla admin</p>} />
      </Routes>
    </MemoryRouter>
  );

const llenar = (correo, contrasena) => {
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: correo } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: contrasena } });
  fireEvent.click(screen.getByText('Iniciar sesión'));
};

describe('FormularioLogin Component', () => {
  beforeEach(() => {
    localStorage.clear();
    registrarUsuario({ nombre: 'Juan', correo: 'juan@gmail.com', contrasena: 'Clave123!' });
  });

  it('muestra los errores al enviar el formulario vacio', async () => {
    renderFormulario();
    fireEvent.click(screen.getByText('Iniciar sesión'));
    expect(await screen.findByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(await screen.findByText('La contraseña no puede estar vacía.')).toBeTruthy();
  });

  it('muestra error si el correo no es de gmail', async () => {
    renderFormulario();
    llenar('juan@hotmail.com', 'Clave123!');
    expect(await screen.findByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Sesión iniciada con éxito!')).toBeNull();
  });

  it('muestra error si el correo tiene solo caracteres especiales', async () => {
    renderFormulario();
    llenar('...@gmail.com', 'Clave123!');
    expect(await screen.findByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Sesión iniciada con éxito!')).toBeNull();
  });

  it('muestra error si el usuario no existe o la contraseña es incorrecta', async () => {
    const onIniciarSesion = jasmine.createSpy('onIniciarSesion').and.rejectWith(new Error('Correo o contraseña incorrectos.'));
    renderFormulario(onIniciarSesion);
    llenar('juan@gmail.com', 'Equivocada1!');
    expect(await screen.findByText('Correo o contraseña incorrectos.')).toBeTruthy();
    expect(onIniciarSesion).toHaveBeenCalled();
  });

  it('inicia sesion con un usuario registrado y limpia el formulario', async () => {
    const onIniciarSesion = jasmine.createSpy('onIniciarSesion').and.resolveTo({ nombre: 'Juan', esAdmin: false });
    renderFormulario(onIniciarSesion);
    llenar('juan@gmail.com', 'Clave123!');
    expect(await screen.findByText('¡Sesión iniciada con éxito!')).toBeTruthy();
    expect((await screen.findByLabelText('Correo electrónico')).value).toBe('');
    expect(onIniciarSesion).toHaveBeenCalledWith({ correo: 'juan@gmail.com', contrasena: 'Clave123!' });
  });

  it('rechaza al admin con una contraseña incorrecta', async () => {
    renderFormulario();
    llenar('admin@gmail.com', 'Admin1234');
    expect(await screen.findByText('Correo o contraseña incorrectos.')).toBeTruthy();
    expect(screen.queryByText('Pantalla admin')).toBeNull();
  });

  it('lleva al panel de admin con admin@gmail.com y su contraseña', async () => {
    renderFormulario();
    llenar('admin@gmail.com', 'Admin123');
    expect(await screen.findByText('Pantalla admin')).toBeTruthy();
  });

  it('renderiza el enlace para registrarse', async () => {
    renderFormulario();
    expect(await screen.findByText('Regístrate aquí')).toBeTruthy();
  });
});
