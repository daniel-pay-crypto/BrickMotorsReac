import { FondoEstelar } from '../components/atoms/FondoEstelar';
import { PortadaEstrella } from '../components/molecules/PortadaEstrella';
import { BitacoraEstrella } from '../components/organisms/BitacoraEstrella';
import './EstrellaMuerte.css';

export function EstrellaMuerte() {
  return (
    <main className="pagina-estrella">
      <FondoEstelar />
      <PortadaEstrella />
      <BitacoraEstrella />
      <p className="pagina-estrella__aclaracion">
        Proyecto fan conceptual de Brick Motors. No es una colaboración oficial
        con LEGO ni Star Wars. Imagen ilustrativa, no producto a la venta.
      </p>
    </main>
  );
}
