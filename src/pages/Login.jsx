import { FormularioLogin } from '../components/organisms/FormularioLogin';

export function Login({ onIniciarSesion }) {
  return (
    <main>
      <FormularioLogin onIniciarSesion={onIniciarSesion} />
    </main>
  );
}
