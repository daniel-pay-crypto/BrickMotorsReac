import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemCarrito } from '../../../components/molecules/ItemCarrito';

const item = { nombre: 'Caminante AT-ST', imagen: '/img/at-st.png', cantidad: 3 };

const renderItem = (props = {}) =>
  render(
    <ItemCarrito
      item={item}
      onCambiarCantidad={() => {}}
      onAumentar={() => {}}
      onReducir={() => {}}
      onEliminar={() => {}}
      {...props}
    />
  );

describe('ItemCarrito Component', () => {
  it('muestra el nombre, la imagen y la cantidad del producto', () => {
    renderItem();
    expect(screen.getByText('Caminante AT-ST')).toBeTruthy();
    expect(screen.getByAltText('Caminante AT-ST')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('llama a las funciones al aumentar, reducir y eliminar', () => {
    const onAumentar = jasmine.createSpy('onAumentar');
    const onReducir = jasmine.createSpy('onReducir');
    const onEliminar = jasmine.createSpy('onEliminar');
    renderItem({ onAumentar, onReducir, onEliminar });
    fireEvent.click(screen.getByLabelText('Aumentar cantidad'));
    fireEvent.click(screen.getByLabelText('Reducir cantidad'));
    fireEvent.click(screen.getByText('Eliminar'));
    expect(onAumentar).toHaveBeenCalled();
    expect(onReducir).toHaveBeenCalled();
    expect(onEliminar).toHaveBeenCalled();
  });

  it('deshabilita reducir con 1 unidad y cambia la cantidad desde el menu', () => {
    const onCambiarCantidad = jasmine.createSpy('onCambiarCantidad');
    renderItem({ item: { ...item, cantidad: 1 }, onCambiarCantidad });
    expect(screen.getByLabelText('Reducir cantidad').disabled).toBe(true);
    fireEvent.click(screen.getByText('u. ▼'));
    fireEvent.click(screen.getByText('5 u.'));
    expect(onCambiarCantidad).toHaveBeenCalledWith(5);
  });
});
