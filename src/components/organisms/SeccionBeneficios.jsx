import { Container, Row, Col } from 'react-bootstrap';
import TituloSeccion from '../atoms/TituloSeccion';
import Revelar from '../atoms/Revelar';
import { TarjetaBeneficio } from '../molecules/TarjetaBeneficio';
import { beneficios } from '../../data/beneficiosData';
import './SeccionBeneficios.css';

export function SeccionBeneficios() {
  return (
    <Container as="section" className="seccion-beneficios">
      <TituloSeccion subtitulo="Todo lo que necesitas para construir, coleccionar y exhibir.">
        ¿Por qué Brick Motors?
      </TituloSeccion>

      <Row className="g-4 justify-content-center">
        {beneficios.map((beneficio) => (
          <Col key={beneficio.id} xs={12} sm={6} lg={3}>
            <Revelar>
              <TarjetaBeneficio
                icono={beneficio.icono}
                titulo={beneficio.titulo}
                texto={beneficio.texto}
              />
            </Revelar>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
