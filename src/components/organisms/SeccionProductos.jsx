import { Container, Row, Col } from 'react-bootstrap';
import TituloSeccion from '../atoms/TituloSeccion';
import { useRecurso } from '../../hooks/useRecurso';
import { TarjetaProducto } from '../molecules/TarjetaProducto';
import './SeccionProductos.css';

export function SeccionProductos({ onAgregar }) {
  const { datos: listaDeLegos, error } = useRecurso('productos');

  return (
    <Container id="productos" className="seccion-productos">
      <TituloSeccion subtitulo="Elige tu próximo set y súmalo a tu colección.">
        Productos Destacados
      </TituloSeccion>

      {!listaDeLegos && !error && <p>Cargando catálogo…</p>}
      {listaDeLegos?.length === 0 && <p>El catálogo está vacío.</p>}
      {error && <p role="alert">{error.message}</p>}
      <Row className="g-4 mt-1 justify-content-center">
        {listaDeLegos?.map((lego) => (
          <Col key={lego.id} xs={12} sm={6} lg={4} xl={3} className="d-flex justify-content-center">
            <TarjetaProducto lego={lego} onAgregar={onAgregar} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
