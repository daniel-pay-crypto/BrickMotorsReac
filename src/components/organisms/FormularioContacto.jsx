import { useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import Text from '../atoms/Text.jsx';
import Button from '../atoms/Button.jsx';
import { FormField } from '../molecules/FormField';
import { estaVacio, esGmailValido } from '../../utils/validaciones';

const valoresIniciales = { nombre: '', correo: '', mensaje: '' };

export function FormularioContacto() {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
    setEnviado(false);
  };

  const validar = () => {
    const nuevos = {};
    if (estaVacio(valores.nombre)) {
      nuevos.nombre = 'El nombre no puede estar vacío.';
    }
    if (estaVacio(valores.correo) || !esGmailValido(valores.correo)) {
      nuevos.correo = 'Ingresa un correo válido de @gmail.com.';
    }
    if (estaVacio(valores.mensaje)) {
      nuevos.mensaje = 'El mensaje no puede estar vacío.';
    }
    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      setEnviado(true);
      setValores(valoresIniciales);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Text variant="h2">Contáctanos</Text>
          <Text variant="p">¿Tienes dudas sobre algún producto? Escríbenos.</Text>
          <Card body>
            <form onSubmit={handleSubmit} noValidate>
              <FormField
                id="nombre"
                name="nombre"
                label="Nombre completo"
                placeholder="Ej. Juan Pérez"
                value={valores.nombre}
                onChange={handleChange}
                error={errores.nombre}
              />
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
                id="mensaje"
                name="mensaje"
                as="textarea"
                rows={4}
                label="Mensaje"
                placeholder="Escribe tu consulta..."
                value={valores.mensaje}
                onChange={handleChange}
                error={errores.mensaje}
              />
              <Button type="submit" className="w-100">
                Enviar mensaje
              </Button>
            </form>
            {enviado && (
              <Alert variant="success" className="mt-3 mb-0">
                ¡Mensaje enviado con éxito!
              </Alert>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}