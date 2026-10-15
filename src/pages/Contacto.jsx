import { Navbar } from '../components/organisms/Navbar';
import { Footer } from '../components/organisms/Footer';
import { FormularioContacto } from '../components/organisms/FormularioContacto';

export function Contacto() {
  return (
    <>
      <Navbar />
      <main>
        <FormularioContacto />
      </main>
      <Footer />
    </>
  );
}