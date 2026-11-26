import { PanelAdmin } from '../components/organisms/PanelAdmin';

export function Administracion({ onCerrarSesion, usuario }) {
  return <PanelAdmin usuario={usuario} onCerrarSesion={onCerrarSesion} />;
}
