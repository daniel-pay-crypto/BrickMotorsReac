import { useState } from 'react';
import Button from '../atoms/Button.jsx';
import { FormField } from '../molecules/FormField';
import { SelectField } from '../molecules/SelectField';
import { TablaDatos } from '../molecules/TablaDatos';
import { estaVacio } from '../../utils/validaciones';

const columnas = [
  { clave: 'codigo', titulo: 'Código' },
  { clave: 'nombre', titulo: 'Nombre' },
  { clave: 'precio', titulo: 'Precio' },
  { clave: 'stock', titulo: 'Stock' },
  { clave: 'categoria', titulo: 'Categoría' },
];

const categorias = ['Technic', 'Star Wars', 'MOC'];

const valoresIniciales = { codigo: '', nombre: '', precio: '', stock: '', categoria: '' };

const mensajes = {
  codigo: 'El código no puede estar vacío.',
  nombre: 'El nombre no puede estar vacío.',
  precio: 'El precio no puede estar vacío.',
  stock: 'El stock no puede estar vacío.',
  categoria: 'Debes seleccionar una categoría.',
};

export function AdminProductos() {
  const [productos, setProductos] = useState([
    { codigo: 'ATST-001', nombre: 'Caminante AT-ST', precio: 150000, stock: 5, categoria: 'Star Wars' },
    { codigo: 'ATAT-001', nombre: 'AT-AT Supremacy', precio: 850000, stock: 2, categoria: 'Star Wars' },
  ]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setValores(valoresIniciales);
    setErrores({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = {};
    Object.keys(mensajes).forEach((campo) => {
      if (estaVacio(valores[campo])) {
        nuevos[campo] = mensajes[campo];
      }
    });
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      setProductos([
        ...productos,
        { ...valores, precio: Number(valores.precio), stock: Number(valores.stock) },
      ]);
      cerrarFormulario();
    }
  };

  return (
    <section>
      <h2 className="mb-4">Productos</h2>
      <Button className="mb-3" onClick={() => setMostrarFormulario(true)}>
        + Nuevo producto
      </Button>
      <TablaDatos columnas={columnas} filas={productos} />
      {mostrarFormulario && (
        <form onSubmit={handleSubmit} noValidate className="border rounded p-3 bg-white">
          <h3 className="h5 mb-3">Nuevo producto</h3>
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