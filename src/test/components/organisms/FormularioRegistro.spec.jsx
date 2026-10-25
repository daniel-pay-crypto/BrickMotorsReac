import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FormularioRegistro } from '../../../components/organisms/FormularioRegistro';

const renderFormulario = () =>
  render(
    <MemoryRouter>
      <FormularioRegistro />
    </MemoryRouter>
  );

describe('FormularioRegistro Component', () => {
  it('muestra los errores al enviar el formulario vacio', () => {
    renderFormulario();
    fireEvent.click(screen.getByText('Registrarse'));
    expect(screen.getByText('El nombre no puede estar vacío.')).toBeTruthy();
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.getByText('La contraseña no puede estar vacía.')).toBeTruthy();
  });

  it('muestra error si el correo no es de gmail', () => {
    renderFormulario();
    fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'juan@hotmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Registrarse'));
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Cuenta creada con éxito!')).toBeNull();
  });

  it('muestra el mensaje de exito y limpia el formulario con datos validos', () => {
    renderFormulario();
    fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'juan@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Registrarse'));
    expect(screen.getByText('¡Cuenta creada con éxito!')).toBeTruthy();
    expect(screen.getByLabelText('Nombre completo').value).toBe('');
  });

  it('renderiza el enlace para iniciar sesion', () => {
    renderFormulario();
    expect(screen.getByText('Inicia sesión aquí')).toBeTruthy();
  });

  it('muestra error si el nombre repite una letra 3 veces seguidas', () => {
    renderFormulario();
    fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'xxx' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'juan@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Registrarse'));
    expect(screen.getByText('Ingresa un nombre válido: solo letras y sin repetir una letra 3 veces seguidas.')).toBeTruthy();
    expect(screen.queryByText('¡Cuenta creada con éxito!')).toBeNull();
  });

  it('muestra error si el correo tiene solo caracteres especiales', () => {
    renderFormulario();
    fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: '...@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Registrarse'));
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Cuenta creada con éxito!')).toBeNull();
  });
});
