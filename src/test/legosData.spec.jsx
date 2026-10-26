import { calcularPrecioFinal, getLegos, addLego, updateLego } from '../../data/legosData';

describe('legosData', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('calcula el precio final con y sin descuento', () => {
    expect(calcularPrecioFinal(1000, 20)).toBe(800);
    expect(calcularPrecioFinal(49990, 20)).toBe(39992);
    expect(calcularPrecioFinal(1000)).toBe(1000);
  });

  it('trae los productos iniciales y agrega uno nuevo con id propio', () => {
    const cantidad = getLegos().length;
    const nuevo = addLego({ codigo: 'X-1', nombre: 'Nuevo', precio: 10, stock: 1, categoria: 'MOC', imagen: '/a.png' });
    expect(nuevo.id).toBe(cantidad + 1);
    expect(getLegos().length).toBe(cantidad + 1);
  });

  it('actualiza un producto sin tocar los demas', () => {
    updateLego(1, { stock: 99 });
    const legos = getLegos();
    expect(legos.find((l) => l.id === 1).stock).toBe(99);
    expect(legos.find((l) => l.id === 2).stock).toBe(2);
  });
});
