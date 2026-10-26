import { Container, Row, Col } from 'react-bootstrap';
import { getLegos } from '../../data/legosData';
import { TarjetaProducto } from '../molecules/TarjetaProducto';

export function SeccionProductos({ onAgregar }) {
  const listaDeLegos = getLegos();

  return (
    <Container id="productos" className="seccion-productos">
      <h2>Productos Destacados</h2>

      <Row className="g-3 mt-2 justify-content-center">
        {listaDeLegos.map((lego) => (
          <Col key={lego.id} xs={12} sm={6} lg={4} xl={3} className="d-flex justify-content-center">
            <TarjetaProducto lego={lego} onAgregar={onAgregar} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
