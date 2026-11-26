import { render, screen, fireEvent } from '@testing-library/react';
import { CarritoDesplegable } from '../../../components/organisms/CarritoDesplegable';

const producto = {
  id: 1,
  descripcion: 'Réplica del caminante AT-ST',
  nombre: 'Caminante AT-ST',
  imagen: '/img/at-st.png',
  precio: 150000,
  descuento: 20,
  stock: 5,
  cantidad: 2,
};

const mostrar = (props = {}) => render(
  <CarritoDesplegable abierto items={[producto]} {...props} />
);

describe('CarritoDesplegable', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra el carrito vacío y desactiva vaciar', () => {
    render(<CarritoDesplegable abierto />);
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
    expect(screen.getByText('0 productos')).toBeTruthy();
    expect(screen.getByText('Total').parentElement.textContent).toContain('0');
    expect(screen.getByRole('button', { name: 'Vaciar carrito' }).disabled).toBe(true);
  });

  it('muestra el producto con imagen y descripción del catálogo', () => {
    mostrar();
    expect(screen.getByText('Caminante AT-ST')).toBeTruthy();
    expect(screen.getByAltText('Caminante AT-ST')).toBeTruthy();
    expect(screen.getByText(/Réplica del caminante AT-ST/)).toBeTruthy();
    expect(screen.getByText('2 productos')).toBeTruthy();
  });

  it('calcula el precio con descuento y el subtotal', () => {
    mostrar();
    expect(screen.getByText((texto) => texto.includes('150.000') && texto.includes('20%'))).toBeTruthy();
    expect(screen.getByText((texto) => texto.includes('120.000'))).toBeTruthy();
    expect(screen.getByText((texto) => texto.includes('Subtotal:') && texto.includes('240.000'))).toBeTruthy();
    expect(screen.getByText('Total').parentElement.textContent).toContain('240.000');
  });

  it('respeta el total entregado por el hook', () => {
    mostrar({ totalPrecio: 200000, totalItems: 3 });
    expect(screen.getByText('3 productos')).toBeTruthy();
    expect(screen.getByText('Total').parentElement.textContent).toContain('200.000');
  });

  it('aumenta, reduce y modifica cantidades con los callbacks del carrito', () => {
    const onAumentar = jasmine.createSpy('onAumentar');
    const onReducir = jasmine.createSpy('onReducir');
    const onCambiarCantidad = jasmine.createSpy('onCambiarCantidad');
    mostrar({ onAumentar, onReducir, onCambiarCantidad });

    fireEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad de Caminante AT-ST' }));
    fireEvent.click(screen.getByRole('button', { name: 'Disminuir cantidad de Caminante AT-ST' }));
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Cantidad de Caminante AT-ST' }), { target: { value: '4' } });

    expect(onAumentar).toHaveBeenCalledWith(1);
    expect(onReducir).toHaveBeenCalledWith(1);
    expect(onCambiarCantidad).toHaveBeenCalledWith(1, 4);
  });

  it('impide superar el stock y bajar de una unidad', () => {
    const onCambiarCantidad = jasmine.createSpy('onCambiarCantidad');
    const { rerender } = mostrar({ onCambiarCantidad });
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Cantidad de Caminante AT-ST' }), { target: { value: '20' } });
    expect(onCambiarCantidad).toHaveBeenCalledWith(1, 5);

    rerender(<CarritoDesplegable abierto items={[{ ...producto, cantidad: 5 }]} />);
    expect(screen.getByRole('button', { name: 'Aumentar cantidad de Caminante AT-ST' }).disabled).toBe(true);

    rerender(<CarritoDesplegable abierto items={[{ ...producto, cantidad: 1 }]} />);
    expect(screen.getByRole('button', { name: 'Disminuir cantidad de Caminante AT-ST' }).disabled).toBe(true);
  });

  it('permite cerrar con el botón, el fondo y la tecla Escape', () => {
    const onCerrar = jasmine.createSpy('onCerrar');
    mostrar({ onCerrar });
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar carrito' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar carrito de compras' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCerrar).toHaveBeenCalledTimes(3);
  });

  it('bloquea el desplazamiento al abrir y lo restaura al cerrar', () => {
    const { rerender } = render(<CarritoDesplegable abierto={false} />);
    const overflowInicial = document.body.style.overflow;
    rerender(<CarritoDesplegable abierto />);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<CarritoDesplegable abierto={false} />);
    expect(document.body.style.overflow).toBe(overflowInicial);
  });

  it('elimina un producto y permite vaciar el carrito', () => {
    const onEliminar = jasmine.createSpy('onEliminar');
    const onVaciar = jasmine.createSpy('onVaciar');
    mostrar({ onEliminar, onVaciar });
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Vaciar carrito' }));
    expect(onEliminar).toHaveBeenCalledWith(1);
    expect(onVaciar).toHaveBeenCalled();
  });

  it('solo muestra finalizar compra si la función está disponible', () => {
    const onFinalizarCompra = jasmine.createSpy('onFinalizarCompra');
    const { rerender } = mostrar();
    expect(screen.queryByRole('button', { name: 'Finalizar compra' })).toBeNull();
    rerender(<CarritoDesplegable abierto items={[producto]} onFinalizarCompra={onFinalizarCompra} />);
    fireEvent.click(screen.getByRole('button', { name: 'Finalizar compra' }));
    expect(onFinalizarCompra).toHaveBeenCalled();
  });

  it('no muestra el panel cerrado y lo habilita al abrir', () => {
    const { container, rerender } = render(<CarritoDesplegable abierto={false} />);
    const contenedor = container.querySelector('.bmcarrito-contenedor');
    expect(contenedor.classList.contains('bmcarrito-abierto')).toBe(false);
    expect(contenedor.getAttribute('aria-hidden')).toBe('true');
    rerender(<CarritoDesplegable abierto />);
    expect(contenedor.classList.contains('bmcarrito-abierto')).toBe(true);
    expect(contenedor.getAttribute('aria-hidden')).toBe('false');
  });

  it('permite seguir comprando y cierra el panel', () => {
    const onCerrar = jasmine.createSpy('onCerrar');
    mostrar({ onCerrar });
    fireEvent.click(screen.getByRole('button', { name: 'Seguir comprando' }));
    expect(onCerrar).toHaveBeenCalledTimes(1);
  });

});
