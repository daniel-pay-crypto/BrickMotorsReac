import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { SesionProvider } from '../../../context/SesionProvider';
import { registrarUsuario } from '../../../data/usuariosData';
import { FormularioLogin } from '../../../components/organisms/FormularioLogin';

const renderFormulario = () =>
  render(
    <MemoryRouter>
      <SesionProvider>
        <Routes>
          <Route path="/" element={<FormularioLogin />} />
          <Route path="/admin" element={<p>Pantalla admin</p>} />
        </Routes>
      </SesionProvider>
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

  it('muestra los errores al enviar el formulario vacio', () => {
    renderFormulario();
    fireEvent.click(screen.getByText('Iniciar sesión'));
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.getByText('La contraseña no puede estar vacía.')).toBeTruthy();
  });

  it('muestra error si el correo no es de gmail', () => {
    renderFormulario();
    llenar('juan@hotmail.com', 'Clave123!');
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Sesión iniciada con éxito!')).toBeNull();
  });

  it('muestra error si el correo tiene solo caracteres especiales', () => {
    renderFormulario();
    llenar('...@gmail.com', 'Clave123!');
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Sesión iniciada con éxito!')).toBeNull();
  });

  it('muestra error si el usuario no existe o la contraseña es incorrecta', () => {
    renderFormulario();
    llenar('juan@gmail.com', 'Equivocada1!');
    expect(screen.getByText('Correo o contraseña incorrectos.')).toBeTruthy();
    expect(localStorage.getItem('sesion')).toBeNull();
  });

  it('inicia sesion con un usuario registrado y limpia el formulario', () => {
    renderFormulario();
    llenar('juan@gmail.com', 'Clave123!');
    expect(screen.getByText('¡Sesión iniciada con éxito!')).toBeTruthy();
    expect(screen.getByLabelText('Correo electrónico').value).toBe('');
    expect(localStorage.getItem('sesion')).not.toBeNull();
  });

  it('rechaza al admin con una contraseña incorrecta', () => {
    renderFormulario();
    llenar('admin@gmail.com', 'Admin1234');
    expect(screen.getByText('Correo o contraseña incorrectos.')).toBeTruthy();
    expect(screen.queryByText('Pantalla admin')).toBeNull();
  });

  it('lleva al panel de admin con admin@gmail.com y su contraseña', () => {
    renderFormulario();
    llenar('admin@gmail.com', 'Admin123');
    expect(screen.getByText('Pantalla admin')).toBeTruthy();
  });

  it('renderiza el enlace para registrarse', () => {
    renderFormulario();
    expect(screen.getByText('Regístrate aquí')).toBeTruthy();
  });
});
