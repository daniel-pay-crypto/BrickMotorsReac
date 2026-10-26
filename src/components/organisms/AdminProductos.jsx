import { useState } from 'react';
import Button from '../atoms/Button.jsx';
import { FormField } from '../molecules/FormField';
import { SelectField } from '../molecules/SelectField';
import { TablaDatos } from '../molecules/TablaDatos';
import { estaVacio } from '../../data/Validaciones.js';
import { getLegos, addLego, updateLego } from '../../data/legosData';

const columnas = [
  { clave: 'codigo', titulo: 'Código' },
  { clave: 'nombre', titulo: 'Nombre' },
  { clave: 'precio', titulo: 'Precio' },
  { clave: 'stock', titulo: 'Stock' },
  { clave: 'categoria', titulo: 'Categoría' },
  { clave: 'descuento', titulo: 'Descuento %' },
];

const categorias = ['Technic', 'Star Wars', 'MOC'];

const imagenPorDefecto = '/img/legos.jpg';

const valoresIniciales = { codigo: '', nombre: '', precio: '', stock: '', categoria: '', imagen: '', descuento: '' };

const mensajes = {
  codigo: 'El código no puede estar vacío.',
  nombre: 'El nombre no puede estar vacío.',
  precio: 'El precio no puede estar vacío.',
  stock: 'El stock no puede estar vacío.',
  categoria: 'Debes seleccionar una categoría.',
};

export function AdminProductos() {
  const [productos, setProductos] = useState(getLegos());
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setEditandoId(null);
    setValores(valoresIniciales);
    setErrores({});
  };

  const abrirNuevo = () => {
    setEditandoId(null);
    setValores(valoresIniciales);
    setErrores({});
    setMostrarFormulario(true);
  };

  const abrirEditar = (producto) => {
    setEditandoId(producto.id);
    setValores({
      codigo: producto.codigo || '',
      nombre: producto.nombre,
      precio: String(producto.precio),
      stock: String(producto.stock),
      categoria: producto.categoria,
      imagen: producto.imagen || '',
      descuento: producto.descuento ? String(producto.descuento) : '',
    });
    setErrores({});
    setMostrarFormulario(true);
  };

  const validar = () => {
    const nuevos = {};
    Object.keys(mensajes).forEach((campo) => {
      if (estaVacio(valores[campo])) {
        nuevos[campo] = mensajes[campo];
      }
    });
    const codigoRepetido = productos.some(
      (p) =>
        p.id !== editandoId &&
        (p.codigo || '').toLowerCase() === valores.codigo.trim().toLowerCase()
    );
    if (!nuevos.codigo && codigoRepetido) {
      nuevos.codigo = 'Ese código ya existe.';
    }
    if (!nuevos.precio && !(Number(valores.precio) > 0)) {
      nuevos.precio = 'El precio debe ser mayor a 0.';
    }
    if (!nuevos.stock && !(Number.isInteger(Number(valores.stock)) && Number(valores.stock) >= 0)) {
      nuevos.stock = 'El stock debe ser un número entero, 0 o mayor.';
    }
    const descuento = Number(valores.descuento);
    if (!estaVacio(valores.descuento) && !(Number.isInteger(descuento) && descuento >= 0 && descuento <= 90)) {
      nuevos.descuento = 'El descuento debe ser un número entero entre 0 y 90.';
    }
    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      const descuento = Number(valores.descuento) || 0;
      const datos = {
        codigo: valores.codigo.trim(),
        nombre: valores.nombre.trim(),
        precio: Number(valores.precio),
        stock: Number(valores.stock),
        categoria: valores.categoria,
        imagen: valores.imagen.trim() || imagenPorDefecto,
        descuento,
        oferta: descuento > 0,
      };
      if (editandoId === null) {
        addLego(datos);
      } else {
        updateLego(editandoId, datos);
      }
      setProductos(getLegos());
      cerrarFormulario();
    }
  };

  return (
    <section>
      <h2 className="mb-4">Productos</h2>
      <Button className="mb-3" onClick={abrirNuevo}>
        + Nuevo producto
      </Button>
      <TablaDatos
        columnas={columnas}
        filas={productos}
        renderAcciones={(producto) => (
          <Button variant="warning" onClick={() => abrirEditar(producto)}>
            Editar
          </Button>
        )}
      />
      {mostrarFormulario && (
        <form onSubmit={handleSubmit} noValidate className="border rounded p-3 bg-white">
          <h3 className="h5 mb-3">{editandoId === null ? 'Nuevo producto' : 'Editar producto'}</h3>
          <FormField
            id="codigo"
            name="codigo"
            label="Código"
            placeholder="Ej. ATAT-001"
            value={valores.codigo}
            onChange={handleChange}
            error={errores.codigo}
          />
          <FormField
            id="nombre"
            name="nombre"
            label="Nombre"
            placeholder="Ej. AT-AT Supremacy"
            value={valores.nombre}
            onChange={handleChange}
            error={errores.nombre}
          />
          <FormField
            id="precio"
            name="precio"
            type="number"
            min="0"
            label="Precio"
            value={valores.precio}
            onChange={handleChange}
            error={errores.precio}
          />
          <FormField
            id="stock"
            name="stock"
            type="number"
            min="0"
            label="Stock"
            value={valores.stock}
            onChange={handleChange}
            error={errores.stock}
          />
          <SelectField
            id="categoria"
            name="categoria"
            label="Categoría"
            placeholder="-- Selecciona una categoría --"
            options={categorias}
            value={valores.categoria}
            onChange={handleChange}
            error={errores.categoria}
          />
          <FormField
            id="imagen"
            name="imagen"
            label="Imagen (URL, opcional)"
            placeholder="Ej. /img/legos.jpg"
            value={valores.imagen}
            onChange={handleChange}
          />
          <FormField
            id="descuento"
            name="descuento"
            type="number"
            min="0"
            max="90"
            label="Descuento % (opcional)"
            value={valores.descuento}
            onChange={handleChange}
            error={errores.descuento}
          />
          <Button type="submit" className="me-2">
            Guardar producto
          </Button>
          <Button variant="light" onClick={cerrarFormulario}>
            Cancelar
          </Button>
        </form>
      )}
    </section>
  );
}
