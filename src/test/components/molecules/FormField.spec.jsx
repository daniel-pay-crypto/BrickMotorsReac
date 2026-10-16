import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormField } from '../../../components/molecules/FormField';

describe('FormField Component', () => {
  it('renderiza la etiqueta del campo', () => {
    render(<FormField id="nombre" label="Nombre" value="" onChange={() => {}} />);
    expect(screen.getByText('Nombre')).toBeTruthy();
  });

  it('asocia la etiqueta con su input', () => {
    render(<FormField id="nombre" label="Nombre" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Nombre')).toBeTruthy();
  });

  it('muestra el mensaje de error y marca el input como invalido', () => {
    render(<FormField id="correo" label="Correo" value="" onChange={() => {}} error="Correo invalido" />);
    expect(screen.getByText('Correo invalido')).toBeTruthy();
    expect(screen.getByLabelText('Correo')).toHaveClass('is-invalid');
  });
});
