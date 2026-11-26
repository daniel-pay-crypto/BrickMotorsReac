import { render, screen, fireEvent } from '@testing-library/react';
import { AdminProductos } from '../../../components/organisms/AdminProductos';

describe('AdminProductos Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza los productos de ejemplo en la tabla', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    expect(await screen.findByText('Caminante AT-ST')).toBeTruthy();
    expect(await screen.findByText('AT-AT Supremacy')).toBeTruthy();
  });

  it('muestra los errores al guardar el formulario vacio', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    expect(screen.queryByText('Nuevo producto')).toBeNull();
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    expect(await screen.findByText('Nuevo producto')).toBeTruthy();
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(await screen.findByText('El código no puede estar vacío.')).toBeTruthy();
    expect(await screen.findByText('Debes seleccionar una categoría.')).toBeTruthy();
  });

  it('agrega un producto nuevo a la tabla con datos validos', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'LEGO-001' } });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Lego Nuevo' } });
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '25000' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Technic' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(await screen.findByText('Lego Nuevo')).toBeTruthy();
  });

  it('edita un producto existente desde la tabla', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    fireEvent.click(screen.getAllByText('Editar')[0]);
    expect(await screen.findByText('Editar producto')).toBeTruthy();
    expect((await screen.findByLabelText('Nombre')).value).toBe('Caminante AT-ST');
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Caminante Editado' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '9' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(await screen.findByText('Caminante Editado')).toBeTruthy();
    expect(screen.queryByText('Caminante AT-ST')).toBeNull();
    expect(screen.queryByText('Editar producto')).toBeNull();
  });

  it('no deja repetir un codigo ni guardar un precio invalido', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'atst-001' } });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Otro' } });
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '9999' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Technic' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(await screen.findByText('Ese código ya existe.')).toBeTruthy();
    expect(await screen.findByText('El precio mínimo es $10.000 CLP.')).toBeTruthy();
  });

  it('guarda el producto nuevo para que aparezca en la tienda', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'LEGO-777' } });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Lego Tienda' } });
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '25000' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Technic' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    await screen.findByText('Lego Tienda');
    const guardados = JSON.parse(localStorage.getItem('legos'));
    const nuevo = guardados.find((p) => p.codigo === 'LEGO-777');
    expect(nuevo.nombre).toBe('Lego Tienda');
    expect(nuevo.imagen).toBe('/img/legos.jpg');
  });

  it('guarda un descuento y lo marca como oferta', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    fireEvent.click(screen.getAllByText('Editar')[0]);
    fireEvent.change(screen.getByLabelText('Descuento % (opcional)'), { target: { value: '15' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    await screen.findByText('15');
    const guardado = JSON.parse(localStorage.getItem('legos')).find((p) => p.id === 1);
    expect(guardado.descuento).toBe(15);
    expect(guardado.oferta).toBe(true);
  });

  it('muestra error si el descuento es mayor a 90', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    fireEvent.click(screen.getAllByText('Editar')[0]);
    fireEvent.change(screen.getByLabelText('Descuento % (opcional)'), { target: { value: '95' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(await screen.findByText('El descuento debe ser un número entero entre 0 y 90.')).toBeTruthy();
  });

  it('acepta un precio de exactamente 10.000', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'LEGO-100' } });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Lego Minimo' } });
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '10000' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Technic' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(screen.queryByText('El precio mínimo es $10.000 CLP.')).toBeNull();
    expect(await screen.findByText('Lego Minimo')).toBeTruthy();
  });

  it('guarda la descripcion del producto nuevo', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    fireEvent.change(screen.getByLabelText('Código'), { target: { value: 'LEGO-200' } });
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Lego Descrito' } });
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '25000' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Technic' } });
    fireEvent.change(screen.getByLabelText('Descripción (opcional)'), { target: { value: 'Set con motor y chasis.' } });
    fireEvent.click(screen.getByText('Guardar producto'));
    await screen.findByText('Lego Descrito');
    const nuevo = JSON.parse(localStorage.getItem('legos')).find((p) => p.codigo === 'LEGO-200');
    expect(nuevo.descripcion).toBe('Set con motor y chasis.');
  });

  it('muestra error si la descripcion pasa de 500 caracteres', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    fireEvent.click(screen.getAllByText('Editar')[0]);
    fireEvent.change(screen.getByLabelText('Descripción (opcional)'), { target: { value: 'a'.repeat(501) } });
    fireEvent.click(screen.getByText('Guardar producto'));
    expect(await screen.findByText('La descripción no puede superar los 500 caracteres.')).toBeTruthy();
  });

  it('cada casilla del formulario muestra un ejemplo de lo que va', async () => {
    render(<AdminProductos />);
    await screen.findByText('Caminante AT-ST');
    fireEvent.click(screen.getByText('+ Nuevo producto'));
    expect(await screen.findByPlaceholderText('Ej Codigo. ATAT-001')).toBeTruthy();
    expect(await screen.findByPlaceholderText('Ej Nombre. AT-AT Supremacy')).toBeTruthy();
    expect(await screen.findByPlaceholderText('Ej de precio. 25000 (mínimo 10000)')).toBeTruthy();
    expect(await screen.findByPlaceholderText('Ej de stock. 10')).toBeTruthy();
    expect(await screen.findByText('-- Selecciona una categoría (Ej. Technic) --')).toBeTruthy();
    expect(await screen.findByPlaceholderText('Ej Descuento. 15')).toBeTruthy();
  });
});
