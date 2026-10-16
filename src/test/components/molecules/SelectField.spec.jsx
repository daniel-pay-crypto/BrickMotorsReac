import React from 'react';
import { render, screen } from '@testing-library/react';
import { SelectField } from '../../../components/molecules/SelectField';

describe('SelectField Component', () => {
  const opciones = ['Administrador', 'Vendedor', 'Cliente'];

  it('renderiza la etiqueta del campo', () => {
    render(<SelectField id="tipo" label="Tipo de usuario" placeholder="Selecciona" options={opciones} value="" onChange={() => {}} />);
    expect(screen.getByText('Tipo de usuario')).toBeTruthy();
  });

  it('renderiza las opciones del select', () => {
    render(<SelectField id="tipo" label="Tipo de usuario" placeholder="Selecciona" options={opciones} value="" onChange={() => {}} />);
    expect(screen.getByText('Vendedor')).toBeTruthy();
    expect(screen.getByText('Cliente')).toBeTruthy();
  });

  it('muestra el mensaje de error y marca el select como invalido', () => {
    render(<SelectField id="tipo" label="Tipo de usuario" placeholder="Selecciona" options={opciones} value="" onChange={() => {}} error="Selecciona un tipo" />);
    expect(screen.getByText('Selecciona un tipo')).toBeTruthy();
    expect(screen.getByLabelText('Tipo de usuario')).toHaveClass('is-invalid');
  });
});
