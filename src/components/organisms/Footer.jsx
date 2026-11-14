import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../atoms/Logo';
import { ColumnaFooter } from '../molecules/ColumnaFooter';
import './Footer.css';

const enlaces = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/productos', texto: 'Productos' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/blog', texto: 'Blog' },
  { ruta: '/contacto', texto: 'Contacto' },
  { ruta: '/cherno', texto: 'Cherno' },
];

export function Footer() {
  return (
    <footer className="pie-pagina">
      <div className="pie-pagina__franja" />
      <Container className="pie-pagina__contenido">
        <Row className="g-4">
          <Col xs={12} md={4}>
            <Logo claro />
            <p className="pie-pagina__lema">
              Sets Technic, Star Wars y proyectos MOC para romper los límites.
            </p>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <ColumnaFooter titulo="Navegación">
              <ul className="pie-pagina__lista">
                {enlaces.map((enlace) => (
                  <li key={enlace.ruta}>
                    <Link to={enlace.ruta}>{enlace.texto}</Link>
                  </li>
                ))}
              </ul>
            </ColumnaFooter>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <ColumnaFooter titulo="Escríbenos">
              <a className="pie-pagina__correo" href="mailto:brickmotors@gmail.com">
                brickmotors@gmail.com
              </a>
              <div className="pie-pagina__redes">
                <a href="https://www.tiktok.com/@brick_motors1" target="_blank" rel="noreferrer">
                  <img src="/img/TikTok.jpg" alt="Síguenos en TikTok" />
                </a>
              </div>
            </ColumnaFooter>
          </Col>
        </Row>
      </Container>
      <p className="pie-pagina__copy">&copy; 2026 Brick Motors. Todos los derechos reservados.</p>
    </footer>
  );
}
