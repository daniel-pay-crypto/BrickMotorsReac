import { Link, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export function RutaAdmin({ usuario = null, children }) {
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!usuario.esAdmin && usuario.rol !== 'VENDEDOR') {
    return (
      <Container className="my-5">
        <h2>Acceso restringido</h2>
        <p>Solo el personal autorizado puede entrar a este panel.</p>
        <Link to="/">Volver al inicio</Link>
      </Container>
    );
  }

  return children;
}
