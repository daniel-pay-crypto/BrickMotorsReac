import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminProductos } from '../../../components/organisms/AdminProductos';

describe('AdminProductos Component', () => {
  it('renderiza los productos de ejemplo en la tabla', () => {
    render(<AdminProductos />);
    expect(screen.getByText('Caminante AT-ST')).toBeTruthy();
    expect(screen.getByText('AT-AT Supremacy')).toBeTruthy();
  });

  it('muestra los errores al guardar el formulario vacio', () => {
    render(<AdminProductos />);
    expect(screen.queryByText('Nuevo producto')).toBeNull();
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    expect(screen.getByText('Nuevo producto')).toBeTruthy();
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(screen.getByText('El código no puede estar vacío.')).toBeTruthy();
    expect(screen.getByText('Debes seleccionar una categoría.')).toBeTruthy();
  });

  it('agrega un producto nuevo a la tabla con datos validos', () => {
    render(<AdminProductos />);
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'LEGO-001' } });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Lego Nuevo' } });
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '2500' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Technic' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(screen.getByText('Lego Nuevo')).toBeTruthy();
  });
});
