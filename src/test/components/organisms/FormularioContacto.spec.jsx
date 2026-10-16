import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioContacto } from '../../../components/organisms/FormularioContacto';

describe('FormularioContacto Component', () => {
  it('muestra los errores al enviar el formulario vacio', () => {
    render(<FormularioContacto />);
    fireEvent.click(screen.getByText('Enviar mensaje'));
    expect(screen.getByText('El nombre no puede estar vacío.')).toBeTruthy();
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.getByText('El mensaje no puede estar vacío.')).toBeTruthy();
  });

  it('muestra error si el correo no es de gmail', () => {
    render(<FormularioContacto />);
    fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'juan@hotmail.com' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'Hola' } });
    fireEvent.click(screen.getByText('Enviar mensaje'));
    expect(screen.getByText('Ingresa un correo válido de @gmail.com.')).toBeTruthy();
    expect(screen.queryByText('¡Mensaje enviado con éxito!')).toBeNull();
  });

  it('muestra el mensaje de exito y limpia el formulario con datos validos', () => {
    render(<FormularioContacto />);
    fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'juan@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'Hola' } });
    fireEvent.click(screen.getByText('Enviar mensaje'));
    expect(screen.getByText('¡Mensaje enviado con éxito!')).toBeTruthy();
    expect(screen.getByLabelText('Nombre completo').value).toBe('');
  });
});
