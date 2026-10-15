import { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AdminProductos } from './AdminProductos';
import { AdminUsuarios } from './AdminUsuarios';

export function PanelAdmin() {
  const [seccion, setSeccion] = useState('productos');

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
            <Nav.Link onClick={() => setSeccion('usuarios')} className="text-white">
              👤 Usuarios
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="p-5 bg-light">
          {seccion === 'productos' ? <AdminProductos /> : <AdminUsuarios />}
        </Col>
      </Row>
    </Container>
  );
}