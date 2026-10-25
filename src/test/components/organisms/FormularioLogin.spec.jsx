import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FormularioLogin } from '../../../components/organisms/FormularioLogin';

const renderFormulario = () =>
  render(
    <MemoryRouter>
      <FormularioLogin />
    </MemoryRouter>
  );

describe('FormularioLogin Component', () => {
  it('muestra los errores al enviar el formulario vacio', () => {
    renderFormulario();
    fireEvent.click(screen.getByText('Iniciar sesión'));
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.getByText('La contraseña no puede estar vacía.')).toBeTruthy();
  });

  it('muestra error si el correo no es de gmail', () => {
    renderFormulario();
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'juan@hotmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Iniciar sesión'));
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Sesión iniciada con éxito!')).toBeNull();
  });

  it('muestra el mensaje de exito y limpia el formulario con datos validos', () => {
    renderFormulario();
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'juan@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Iniciar sesión'));
    expect(screen.getByText('¡Sesión iniciada con éxito!')).toBeTruthy();
    expect(screen.getByLabelText('Correo electrónico').value).toBe('');
  });

  it('renderiza el enlace para registrarse', () => {
    renderFormulario();
    expect(screen.getByText('Regístrate aquí')).toBeTruthy();
  });

  it('muestra error si el correo tiene solo caracteres especiales', () => {
    renderFormulario();
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: '...@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Iniciar sesión'));
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Sesión iniciada con éxito!')).toBeNull();
  });
});
