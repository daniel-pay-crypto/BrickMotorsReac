import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input Component', () => {
  it('renderiza el input con su placeholder', () => {
    render(<Input placeholder="Escribe aqui" />);
    expect(screen.getByPlaceholderText('Escribe aqui')).toBeTruthy();
  });

  it('marca el input como invalido con isInvalid', () => {
    render(<Input placeholder="Escribe aqui" isInvalid />);
    expect(screen.getByPlaceholderText('Escribe aqui')).toHaveClass('is-invalid');
  });

  it('ejecuta onChange al escribir', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<Input placeholder="Escribe aqui" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('Escribe aqui'), { target: { value: 'hola' } });
    expect(onChange).toHaveBeenCalled();
  });
});
