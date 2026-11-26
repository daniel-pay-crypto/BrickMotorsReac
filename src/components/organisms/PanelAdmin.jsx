import { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AdminProductos } from './AdminProductos';
import { GestionTienda } from './GestionTienda';
import { AdminUsuarios } from './AdminUsuarios';

export function PanelAdmin({ usuario, onCerrarSesion = () => {} }) {
  const [seccion, setSeccion] = useState('productos');
  const vendedor = usuario?.rol === 'VENDEDOR';
  const navigate = useNavigate();

  const salir = () => {
    onCerrarSesion();
    navigate('/');
  };

  return (
    <Container fluid>
      <Row className="min-vh-100">
        <Col md={2} className="bg-dark p-3">
          <h5 className="text-white mb-4">🧱 Brick Motors Admin</h5>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" className="text-white">
              ⬅ Volver a la tienda
            </Nav.Link>
            <Nav.Link onClick={() => setSeccion('productos')} className="text-white">
              📦 Productos
            </Nav.Link>
            {!vendedor && <Nav.Link onClick={() => setSeccion('usuarios')} className="text-white">
              👤 Usuarios
            </Nav.Link>}
            {['categorias', 'pedidos', 'contacto'].map(nombre => <Nav.Link key={nombre} onClick={() => setSeccion(nombre)} className="text-white text-capitalize">{nombre}</Nav.Link>)}
            <Nav.Link onClick={salir} className="text-white">
              🚪 Cerrar sesión
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="p-5 bg-light">
          {seccion === 'productos' ? <AdminProductos /> : seccion === 'usuarios' && !vendedor ? <AdminUsuarios /> : <GestionTienda key={seccion} seccion={seccion} />}
        </Col>
      </Row>
    </Container>
  );
}