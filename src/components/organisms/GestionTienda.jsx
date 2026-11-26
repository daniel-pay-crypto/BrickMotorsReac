import { useState } from 'react';
import { useRecurso } from '../../hooks/useRecurso';
import { api } from '../../data/api';
import Button from '../atoms/Button.jsx';

export function GestionTienda({ seccion }) {
  const { datos = [], error, recargar } = useRecurso(seccion);
  const [fallo, setFallo] = useState('');
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState(null);
  async function guardar(ruta, metodo, datos) {
    try {
      await api(ruta, metodo, datos);
      setFallo('');
      setNombre('');
      setId(null);
      recargar();
    } catch (e) { setFallo(e.message); }
  }
  return <section><h2 className="text-capitalize">{seccion}</h2>
    {(error || fallo) && <p role="alert">{fallo || error.message}</p>}
    {seccion === 'categorias' && <form className="mb-3" onSubmit={e => {
      e.preventDefault();
      guardar(id ? 'categorias/' + id : 'categorias', id ? 'PUT' : 'POST', { nombre });
    }}>
      <label>Categoría<input className="form-control" required value={nombre} onChange={e => setNombre(e.target.value)} /></label>
      <Button type="submit">{id ? 'Guardar cambios' : 'Crear categoría'}</Button>
      {id && <Button type="button" onClick={() => { setId(null); setNombre(''); }}>Cancelar</Button>}
    </form>}
    {datos.map(item => <article className="card p-3 mb-2" key={item.id}>
      {seccion === 'categorias' && <div><strong>{item.nombre}</strong>
        <Button variant="warning" onClick={() => { setNombre(item.nombre); setId(item.id); }}>Editar</Button>
        <Button variant="danger" onClick={() => guardar('categorias/' + item.id, 'DELETE')}>Eliminar</Button></div>}
      {seccion === 'contacto' && <div><strong>{item.nombre} · {item.correo}</strong><p>{item.mensaje}</p>
        <Button disabled={item.leido} onClick={() => guardar('contacto/' + item.id + '/leido', 'PATCH')}>{item.leido ? 'Leído' : 'Marcar leído'}</Button>
        <Button variant="danger" onClick={() => guardar('contacto/' + item.id, 'DELETE')}>Eliminar</Button></div>}
      {seccion === 'pedidos' && <div><h3>Pedido #{item.id}</h3><p>{item.nombreUsuario} · ${item.total.toLocaleString('es-CL')}</p>
        <ul>{item.detalles.map(d => <li key={d.productoId}>{d.nombreProducto} × {d.cantidad}</li>)}</ul>
        <label>Estado <select value={item.estado} disabled={['ENTREGADO','CANCELADO'].includes(item.estado)}
          onChange={e => guardar('pedidos/' + item.id + '/estado', 'PATCH', { estado: e.target.value })}>
          {['PENDIENTE','PAGADO','ENVIADO','ENTREGADO','CANCELADO'].map(e => <option key={e}>{e}</option>)}
        </select></label></div>}
    </article>)}
  </section>;
}
