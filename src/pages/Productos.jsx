import { SeccionProductos } from '../components/organisms/SeccionProductos';

export function Productos({ agregarAlCarrito }) {
  return (
    <main>
      <SeccionProductos onAgregar={agregarAlCarrito} />
    </main>
  );
}
