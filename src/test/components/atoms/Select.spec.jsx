import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../../../components/atoms/Select';

describe('Select Component', () => {
  const opciones = ['Technic', 'Star Wars'];

  it('renderiza el placeholder como primera opcion', () => {
    render(<Select name="categoria" value="" onChange={() => {}} options={opciones} placeholder="Elige una categoria" />);
    expect(screen.getByText('Elige una categoria')).toBeTruthy();
  });

  it('renderiza todas las opciones recibidas', () => {
    render(<Select name="categoria" value="" onChange={() => {}} options={opciones} placeholder="Elige una categoria" />);
    expect(screen.getByText('Technic')).toBeTruthy();
    expect(screen.getByText('Star Wars')).toBeTruthy();
  });

  it('ejecuta onChange al seleccionar una opcion', () => {
    const onChange = jasmine.createSpy('onChange');
    const { container } = render(<Select name="categoria" value="" onChange={onChange} options={opciones} placeholder="Elige una categoria" />);
    fireEvent.change(container.querySelector('select'), { target: { value: 'Technic' } });
    expect(onChange).toHaveBeenCalled();
  });
});
