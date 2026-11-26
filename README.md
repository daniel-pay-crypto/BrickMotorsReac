# BrickMotorsReac

Tienda Brick Motors de Daniel Leyton, Thomás Osorio y Felipe Baes. React, Vite, React Router y React Bootstrap consumen la API Spring Boot de BrickMotors-Backend.

## Ejecutar en desarrollo

Con el backend disponible en el puerto 8081, ejecutar `npm ci` y `npm run dev`. Abrir `http://localhost:5173`. Vite reenvía `/api` al backend. La variable `BRICK_API_PROXY` permite cambiar el servidor de destino.

## Comprar y administrar

El catálogo y las fichas muestran existencias, imágenes y precios de la API. Un visitante puede agregar productos al carrito antes de registrarse o iniciar sesión. Al confirmar la compra, el servidor verifica existencias y precios, descuenta el stock y devuelve el número del pedido. La opción **Mis pedidos** muestra el historial y los detalles de cada compra. El formulario de contacto confirma el envío al recibir la respuesta del servidor.

Desde **Panel Admin**, el vendedor gestiona productos, categorías, estados de pedidos y mensajes de contacto. El administrador también puede crear, editar y eliminar usuarios y asignar roles. El registro público crea clientes.

## Sesión y despliegue

React mantiene el JWT de acceso en memoria. La cookie de sesión HttpOnly permite solicitar un JWT nuevo después de una recarga. El cierre de sesión invalida la sesión en Spring. La autorización definitiva y la selección del propietario del pedido corresponden al backend.

En producción, servir la tienda por HTTPS. Configurar un proxy de `/api` al backend antes de la regla de navegación de la SPA, o definir `VITE_API_BASE_URL` con la URL completa de la API, incluido `/api/v1`, al compilar. En ese segundo caso, configurar el origen exacto en `CORS_ALLOWED_ORIGINS` del backend. Para dominios de sitios distintos se requiere `COOKIE_SAME_SITE=none`, HTTPS y un navegador que acepte la cookie entre sitios.

## Verificación

- `npm test` ejecuta Karma, Jasmine y Testing Library con Chromium. Se puede definir `CHROME_BIN`.
- `npm run lint` comprueba el código y `npm run build` crea la distribución.
- `npm run test:e2e` recorre registro, compra, recarga, historial, permisos, contacto y cierre de sesión en un navegador real. Definir `BRICK_TEST_URL` con una instancia de pruebas de la tienda que tenga stock en el primer producto. El recorrido crea una cuenta, un pedido y un mensaje. Por defecto utiliza Edge. Para otro Chromium, definir `CHROME_BIN`.
