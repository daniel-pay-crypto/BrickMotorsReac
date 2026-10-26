import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FormularioRegistro } from '../../../components/organisms/FormularioRegistro';
import { buscarUsuario } from '../../../data/usuariosData';

const mensajeContrasena =
  'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';

const renderFormulario = () =>
  render(
    <MemoryRouter>
      <FormularioRegistro />
    </MemoryRouter>
  );

const llenar = (nombre, correo, contrasena) => {
  fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: nombre } });
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: correo } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: contrasena } });
  fireEvent.click(screen.getByText('Registrarse'));
};

describe('FormularioRegistro Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra los errores al enviar el formulario vacio', () => {
    renderFormulario();
    fireEvent.click(screen.getByText('Registrarse'));
    expect(screen.getByText('El nombre no puede estar vacío.')).toBeTruthy();
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.getByText('La contraseña no puede estar vacía.')).toBeTruthy();
  });

  it('muestra error si el correo no es de gmail', () => {
    renderFormulario();
    llenar('Juan', 'juan@hotmail.com', 'Clave123!');
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Cuenta creada con éxito!')).toBeNull();
  });

  it('muestra el mensaje de exito, limpia el formulario y guarda el usuario', () => {
    renderFormulario();
    llenar('Juan', 'juan@gmail.com', 'Clave123!');
    expect(screen.getByText('¡Cuenta creada con éxito!')).toBeTruthy();
    expect(screen.getByLabelText('Nombre completo').value).toBe('');
    expect(buscarUsuario('juan@gmail.com', 'Clave123!')).not.toBeNull();
  });

  it('renderiza el enlace para iniciar sesion', () => {
    renderFormulario();
    expect(screen.getByText('Inicia sesión aquí')).toBeTruthy();
  });

  it('muestra error si el nombre repite una letra 3 veces seguidas', () => {
    renderFormulario();
    llenar('xxx', 'juan@gmail.com', 'Clave123!');
    expect(screen.getByText('Ingresa un nombre válido: solo letras y sin repetir una letra 3 veces seguidas.')).toBeTruthy();
    expect(screen.queryByText('¡Cuenta creada con éxito!')).toBeNull();
  });

  it('muestra error si el correo tiene solo caracteres especiales', () => {
    renderFormulario();
    llenar('Juan', '...@gmail.com', 'Clave123!');
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Cuenta creada con éxito!')).toBeNull();
  });

  it('rechaza contraseñas sin mayuscula, minuscula, numero o caracter especial', () => {
    ['clave123!', 'CLAVE123!', 'Clave!!!!', 'Clave1234', 'Cl1!'].forEach((contrasena) => {
      const { unmount } = renderFormulario();
      llenar('Juan', 'juan@gmail.com', contrasena);
      expect(screen.getByText(mensajeContrasena)).toBeTruthy();
      expect(screen.queryByText('¡Cuenta creada con éxito!')).toBeNull();
      unmount();
    });
  });

  it('no deja registrar el correo del admin ni un correo repetido', () => {
    renderFormulario();
    llenar('Falso', 'admin@gmail.com', 'Clave123!');
    expect(screen.getByText('Ese correo ya está registrado.')).toBeTruthy();
  });
});
