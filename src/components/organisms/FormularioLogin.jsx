import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import Text from '../atoms/Text.jsx';
import Button from '../atoms/Button.jsx';
import { FormField } from '../molecules/FormField';
import { estaVacio, esGmailValido } from '../../data/Validaciones.js';

const valoresIniciales = { correo: '', contrasena: '' };

export function FormularioLogin() {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevos = {};
    if (estaVacio(valores.correo) || !esGmailValido(valores.correo)) {
      nuevos.correo = 'Ingresa un correo válido de @gmail.com.';
    }
    if (estaVacio(valores.contrasena)) {
      nuevos.contrasena = 'La contraseña no puede estar vacía.';
    }
    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExito(false);
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      setExito(true);
      setValores(valoresIniciales);
      if (valores.correo.trim().toLowerCase() === 'admin@gmail.com') {
        navigate('/admin');
      }
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Text variant="h1">Iniciar Sesión</Text>
          <Card body>
            <form onSubmit={handleSubmit} noValidate>
              <FormField
                id="correo"
                name="correo"
                type="email"
                label="Correo electrónico"
                placeholder="ejemplo@gmail.com"
                value={valores.correo}
                onChange={handleChange}
                error={errores.correo}
              />
              <FormField
                id="contrasena"
                name="contrasena"
                type="password"
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                value={valores.contrasena}
                onChange={handleChange}
                error={errores.contrasena}
              />
              <Button type="submit" className="w-100">
                Iniciar sesión
              </Button>
            </form>
            {exito && (
              <Alert variant="success" className="mt-3 mb-0">
                ¡Sesión iniciada con éxito!
              </Alert>
            )}
            <Text variant="p" className="mt-3 mb-0">
              ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
