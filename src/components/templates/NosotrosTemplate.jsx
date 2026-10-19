import { Navbar } from '../organisms/Navbar';
import { Footer } from '../organisms/Footer';
import Text from '../atoms/Text';
import '../../styles/templates/NosotrosTemplate.css';

// Template: esqueleto de la página Nosotros (Navbar + contenido + Footer).


// El contenido de la página entra por "children".
export function NosotrosTemplate({ titulo, subtitulo, children }) {
  return (
    <div className="nosotros-template">
      <Navbar />
      <main className="seccion-nosotros-hero">
        <div className="overlay-nosotros">
          <Text variant="h1" className="titulo-nosotros">{titulo}</Text>
          <Text variant="p" className="subtitulo-nosotros">{subtitulo}</Text>
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}