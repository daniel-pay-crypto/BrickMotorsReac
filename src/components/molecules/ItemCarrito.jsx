import './ItemCarrito.css';
import { useState } from 'react';
import { calcularPrecioFinal } from '../../data/legosData';

export function ItemCarrito({
  item,
  onCambiarCantidad,
  onAumentar,
  onReducir,
  onEliminar,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [valorInput, setValorInput] = useState('');

  const abrirMenuCantidad = () => {
    setMenuAbierto(!menuAbierto);
  };

  const elegirCantidad = (cantidad) => {
    onCambiarCantidad(cantidad);
    setMenuAbierto(false);
    setInputVisible(false);
    setValorInput('');
  };

  const aplicarInput = () => {
    const cantidad = Number(valorInput);
    if (Number.isInteger(cantidad) && cantidad > 0) {
      elegirCantidad(cantidad);
    } else {
      alert('Por favor, ingresa un número válido.');
    }
  };

  return (
    <div className="item-carrito">
      <img src={item.imagen} alt={item.nombre} />
      <div className="item-carrito-info">
        <span className="item-carrito-nombre">{item.nombre}</span>
        {item.precio !== undefined && (
          <span className="item-carrito-precio">
            {item.descuento > 0 && (
              <span className="precio-original">${item.precio.toLocaleString('es-CL')}</span>
            )}
            <span className="precio-final">
              ${calcularPrecioFinal(item.precio, item.descuento).toLocaleString('es-CL')}
            </span>
            {item.descuento > 0 && (
              <span className="etiqueta-descuento">-{item.descuento}%</span>
            )}
          </span>
        )}
        <div className="controles-cantidad">
          <button
            className="btn-cantidad btn-paso"
            onClick={onReducir}
            disabled={item.cantidad <= 1}
            aria-label="Reducir cantidad"
          >
            -
          </button>
          <button className="btn-cantidad" onClick={abrirMenuCantidad}>
            <span>{item.cantidad}</span> u. ▼
          </button>
          <button
            className="btn-cantidad btn-paso"
            onClick={onAumentar}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
          {menuAbierto && (
            <div className="dropdown-cantidad">
              <button onClick={() => elegirCantidad(2)}>2 u.</button>
              <button onClick={() => elegirCantidad(5)}>5 u.</button>
              <button onClick={() => elegirCantidad(10)}>10 u.</button>
              <button onClick={() => setInputVisible(true)}>Más unidades</button>
              {inputVisible && (
                <div className="caja-input">
                  <input
                    type="number"
                    min="1"
                    placeholder="Ej: 20"
                    value={valorInput}
                    onChange={(e) => setValorInput(e.target.value)}
                  />
                  <button onClick={aplicarInput}>Ok</button>
                </div>
              )}
            </div>
          )}
          <button className="btn-eliminar-item" onClick={onEliminar}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
