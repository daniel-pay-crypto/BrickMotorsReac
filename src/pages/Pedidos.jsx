import { useRecurso } from '../hooks/useRecurso';

export function Pedidos({ usuario }) {
  const { datos, error } = useRecurso('pedidos?usuarioId=' + usuario.id);
  return <main className="container my-5"><h1>Mis pedidos</h1>
    {error && <p role="alert">{error.message}</p>}
    {!datos && !error && <p>Cargando pedidos…</p>}
    {datos?.length === 0 && <p>Todavía no tienes pedidos.</p>}
    {datos?.map(p => <article key={p.id} className="card p-3 mb-3">
      <h2>Pedido #{p.id}</h2><p>{p.estado} · Total ${p.total.toLocaleString('es-CL')}</p>
      <ul>{p.detalles.map(d => <li key={d.productoId}>{d.nombreProducto} × {d.cantidad}</li>)}</ul>
    </article>)}
  </main>;
}
