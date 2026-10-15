import { Navbar } from '../components/organisms/Navbar';
import { Footer } from '../components/organisms/Footer';
import { SeccionProductos } from '../components/organisms/SeccionProductos';

export function Productos() {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <SeccionProductos />
      </main>
      {/* <Footer /> */}
    </>
  );
}