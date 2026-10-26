import { useState } from 'react';
import Button from '../atoms/Button.jsx';
import { FormField } from '../molecules/FormField';
import { SelectField } from '../molecules/SelectField';
import { TablaDatos } from '../molecules/TablaDatos';
import { estaVacio, esGmailValido, esNombreValido } from '../../data/Validaciones.js';
import { getPersonal, addPersonal, updatePersonal } from '../../data/personalData';

const columnas = [
  { clave: 'nombre', titulo: 'Nombre' },
  { clave: 'correo', titulo: 'Correo' },
  { clave: 'tipo', titulo: 'Tipo' },
];

const tipos = ['Administrador', 'Vendedor', 'Cliente'];

const valoresIniciales = { nombre: '', correo: '', tipo: '' };

export function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(getPersonal());
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

  const abrirEditar = (usuario) => {
    setEditandoId(usuario.id);
    setValores({ nombre: usuario.nombre, correo: usuario.correo, tipo: usuario.tipo });
    setErrores({});
    setMostrarFormulario(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = {};
    if (estaVacio(valores.nombre)) {
      nuevos.nombre = 'El nombre no puede estar vacío.';
    } else if (!esNombreValido(valores.nombre)) {
      nuevos.nombre = 'Ingresa un nombre válido: solo letras y sin repetir una letra 3 veces seguidas.';
    }
    if (estaVacio(valores.correo) || !esGmailValido(valores.correo)) {
      nuevos.correo = 'Ingresa un correo válido de @gmail.com.';
    }
    if (estaVacio(valores.tipo)) {
      nuevos.tipo = 'Debes seleccionar un tipo de usuario.';
    }
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      const datos = {
        nombre: valores.nombre.trim(),
        correo: valores.correo.trim().toLowerCase(),
        tipo: valores.tipo,
      };
      if (editandoId === null) {
        addPersonal(datos);
      } else {
        updatePersonal(editandoId, datos);
      }
      setUsuarios(getPersonal());
      cerrarFormulario();
    }
  };

  return (
    <section>
      <h2 className="mb-4">Usuarios</h2>
      <Button className="mb-3" onClick={abrirNuevo}>
        + Nuevo usuario
      </Button>
      <TablaDatos
        columnas={columnas}
        filas={usuarios}
        renderAcciones={(usuario) => (
          <Button variant="warning" onClick={() => abrirEditar(usuario)}>
            Editar
          </Button>
        )}
      />
      {mostrarFormulario && (
        <form onSubmit={handleSubmit} noValidate className="border rounded p-3 bg-white">
          <h3 className="h5 mb-3">{editandoId === null ? 'Nuevo usuario' : 'Editar usuario'}</h3>
          <FormField
            id="nombre"
            name="nombre"
            label="Nombre"
            placeholder="Ej. Juan Pérez"
            value={valores.nombre}
            onChange={handleChange}
            error={errores.nombre}
          />
          <FormField
            id="correo"
            name="correo"
            type="email"
            label="Correo"
            placeholder="ejemplo@gmail.com"
            value={valores.correo}
            onChange={handleChange}
            error={errores.correo}
          />
          <SelectField
            id="tipo"
            name="tipo"
            label="Tipo de usuario"
            placeholder="-- Selecciona un tipo --"
            options={tipos}
            value={valores.tipo}
            onChange={handleChange}
            error={errores.tipo}
          />
          <Button type="submit" className="me-2">
            Guardar usuario
          </Button>
          <Button variant="light" onClick={cerrarFormulario}>
            Cancelar
          </Button>
        </form>
      )}
    </section>
  );
}
