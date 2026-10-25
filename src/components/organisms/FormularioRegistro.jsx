import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import Text from '../atoms/Text.jsx';
import Button from '../atoms/Button.jsx';
import { FormField } from '../molecules/FormField';
import { estaVacio, esGmailValido, esNombreValido } from '../../data/Validaciones.js';

const valoresIniciales = { nombre: '', correo: '', contrasena: '' };

export function FormularioRegistro() {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevos = {};
    if (estaVacio(valores.nombre)) {
      nuevos.nombre = 'El nombre no puede estar vacío.';
    } else if (!esNombreValido(valores.nombre)) {
      nuevos.nombre = 'Ingresa un nombre válido: solo letras y sin repetir una letra 3 veces seguidas.';
    }
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
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Text variant="h1">Crear Cuenta</Text>
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
                id="contrasena"
                name="contrasena"
                type="password"
                label="Contraseña"
                placeholder="Crea una contraseña"
                value={valores.contrasena}
                onChange={handleChange}
                error={errores.contrasena}
              />
              <Button type="submit" className="w-100">
                Registrarse
              </Button>
            </form>
            {exito && (
              <Alert variant="success" className="mt-3 mb-0">
                ¡Cuenta creada con éxito!
              </Alert>
            )}
            <Text variant="p" className="mt-3 mb-0">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
