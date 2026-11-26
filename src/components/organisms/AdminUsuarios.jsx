import { api } from '../../data/api';
import { useRecurso } from '../../hooks/useRecurso';
import { useState } from 'react';
import Button from '../atoms/Button.jsx';
import { FormField } from '../molecules/FormField';
import { SelectField } from '../molecules/SelectField';
import { TablaDatos } from '../molecules/TablaDatos';
import { estaVacio, esGmailValido, esNombreValido, MENSAJE_NOMBRE_INVALIDO } from '../../data/Validaciones.js';

const columnas = [
  { clave: 'nombre', titulo: 'Nombre' },
  { clave: 'correo', titulo: 'Correo' },
  { clave: 'rol', titulo: 'Tipo' },
];

const tipos = ['ADMIN', 'VENDEDOR', 'CLIENTE'];

const valoresIniciales = { nombre: '', correo: '', tipo: '' };

export function AdminUsuarios() {
  const { datos: usuarios = [], error, recargar } = useRecurso('usuarios');
  const [fallo, setFallo] = useState('');
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
    setValores({ nombre: usuario.nombre, correo: usuario.correo, tipo: usuario.rol });
    setErrores({});
    setMostrarFormulario(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevos = {};
    if (estaVacio(valores.nombre)) {
      nuevos.nombre = 'El nombre no puede estar vacío.';
    } else if (!esNombreValido(valores.nombre)) {
      nuevos.nombre = MENSAJE_NOMBRE_INVALIDO;
    }
    if (estaVacio(valores.correo) || !esGmailValido(valores.correo)) {
      nuevos.correo = 'Ingresa un correo válido de @gmail.com.';
    }
    if (estaVacio(valores.tipo)) {
      nuevos.tipo = 'Debes seleccionar un tipo de usuario.';
    }
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      const nombre = valores.nombre.trim();
      const correo = valores.correo.trim().toLowerCase();
      const rol = valores.tipo;
      try {
        setFallo('');
        if (editandoId === null) {
          await api('usuarios/personal', 'POST', {
            usuario: { nombre, correo, contrasena: valores.contrasena }, rol,
          });
        } else {
          await api('usuarios/' + editandoId, 'PUT', { nombre, correo, rol });
        }
        recargar();
        cerrarFormulario();
      } catch (e) { setFallo(e.message); }
    }
  };

  return (
    <section>
      {(fallo || error) && <p role="alert">{fallo || error.message}</p>}
      <h2 className="mb-4">Usuarios</h2>
      <Button className="mb-3" onClick={abrirNuevo}>
        + Nuevo usuario
      </Button>
      <TablaDatos
        columnas={columnas}
        filas={usuarios}
        renderAcciones={(usuario) => (<>
          <Button variant="warning" onClick={() => abrirEditar(usuario)}>Editar</Button>
          <Button variant="danger" onClick={async () => {
            try { await api('usuarios/' + usuario.id, 'DELETE'); setFallo(''); recargar(); }
            catch (e) { setFallo(e.message); }
          }}>Eliminar</Button>
        </>)}
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
          {editandoId === null && <FormField name="contrasena" id="contrasena" type="password" label="Contraseña inicial" value={valores.contrasena || ''} onChange={handleChange} />}
          <SelectField
            id="tipo"
            name="tipo"
            label="Tipo de usuario"
            placeholder="-- Selecciona un tipo (Ej. Vendedor) --"
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
