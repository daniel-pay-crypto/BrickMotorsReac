import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminProductos } from '../../../components/organisms/AdminProductos';

describe('AdminProductos Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

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

  it('edita un producto existente desde la tabla', () => {
    render(<AdminProductos />);
    fireEvent.click(screen.getAllByText('Editar')[0]);
    expect(screen.getByText('Editar producto')).toBeTruthy();
    expect(screen.getByLabelText('Nombre').value).toBe('Caminante AT-ST');
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Caminante Editado' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '9' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(screen.getByText('Caminante Editado')).toBeTruthy();
    expect(screen.queryByText('Caminante AT-ST')).toBeNull();
    expect(screen.queryByText('Editar producto')).toBeNull();
  });

  it('no deja repetir un codigo ni guardar un precio invalido', () => {
    render(<AdminProductos />);
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'atst-001' } });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Otro' } });
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Technic' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(screen.getByText('Ese código ya existe.')).toBeTruthy();
    expect(screen.getByText('El precio debe ser mayor a 0.')).toBeTruthy();
  });

  it('guarda el producto nuevo para que aparezca en la tienda', () => {
    render(<AdminProductos />);
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'LEGO-777' } });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Lego Tienda' } });
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '2500' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Technic' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    const guardados = JSON.parse(localStorage.getItem('legos'));
    const nuevo = guardados.find((p) => p.codigo === 'LEGO-777');
    expect(nuevo.nombre).toBe('Lego Tienda');
    expect(nuevo.imagen).toBe('/img/legos.jpg');
  });

  it('guarda un descuento y lo marca como oferta', () => {
    render(<AdminProductos />);
    fireEvent.click(screen.getAllByText('Editar')[0]);
    fireEvent.change(screen.getByLabelText('Descuento % (opcional)'), { target: { value: '15' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    const guardado = JSON.parse(localStorage.getItem('legos')).find((p) => p.id === 1);
    expect(guardado.descuento).toBe(15);
    expect(guardado.oferta).toBe(true);
  });

  it('muestra error si el descuento es mayor a 90', () => {
    render(<AdminProductos />);
    fireEvent.click(screen.getAllByText('Editar')[0]);
    fireEvent.change(screen.getByLabelText('Descuento % (opcional)'), { target: { value: '95' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(screen.getByText('El descuento debe ser un número entero entre 0 y 90.')).toBeTruthy();
  });
});
