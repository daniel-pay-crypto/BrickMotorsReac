import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { chromium } from 'playwright-core';

test('compra y contacto mediante React y Spring', async () => {
  const origen = process.env.BRICK_TEST_URL;
  assert.ok(origen, 'Configura BRICK_TEST_URL con la tienda de pruebas.');
  const navegador = await chromium.launch({
    executablePath: process.env.CHROME_BIN || undefined,
    channel: process.env.CHROME_BIN ? undefined : 'msedge',
  });
  try {
    const pagina = await navegador.newPage({ baseURL: origen });
    const correo = 'compra.' + randomUUID().replaceAll('-', '') + '@gmail.com';
    const contrasena = 'Prueba!' + randomUUID();
    await pagina.goto('/registro');
    await pagina.getByLabel('Nombre completo').fill('Ana Soto');
    await pagina.getByLabel('Correo electrónico').fill(correo);
    await pagina.getByLabel('Contraseña').fill(contrasena);
    await pagina.getByRole('button', { name: 'Registrarse' }).click();
    await pagina.getByText('¡Cuenta creada con éxito!').waitFor();
    await pagina.goto('/productos');
    await pagina.getByText('Ver detalles del producto').first().click();
    await pagina.waitForURL('**/products/*');
    await pagina.locator('.detalle-producto__boton--comprar').click();
    await pagina.getByText('1 producto', { exact: true }).waitFor();
    await pagina.getByRole('button', { name: 'Finalizar compra' }).click();
    await pagina.getByLabel('Correo electrónico').fill(correo);
    await pagina.getByLabel('Contraseña').fill(contrasena);
    await pagina.getByRole('button', { name: 'Iniciar sesión' }).click();
    await pagina.getByText('Hola, Ana').waitFor();
    await pagina.reload();
    await pagina.getByText('Hola, Ana').waitFor();
    const cookie = (await pagina.context().cookies()).find(c => c.name === 'JSESSIONID');
    assert.ok(cookie?.httpOnly);
    assert.equal(await pagina.evaluate(() => localStorage.getItem('sesion')), null);
    await pagina.getByRole('button', { name: 'Abrir carrito' }).click();
    await pagina.getByRole('button', { name: 'Finalizar compra' }).click();
    await pagina.getByText(/Pedido #\d+ confirmado/).waitFor();
    await pagina.getByRole('button', { name: 'Seguir comprando' }).click();
    await pagina.getByRole('link', { name: 'Mis pedidos' }).click();
    await pagina.getByRole('heading', { name: /Pedido #/ }).waitFor();
    await pagina.goto('/admin');
    await pagina.getByRole('heading', { name: 'Acceso restringido' }).waitFor();
    await pagina.goto('/contacto');
    await pagina.getByLabel('Nombre completo').fill('Ana Soto');
    await pagina.getByLabel('Correo electrónico').fill(correo);
    await pagina.getByLabel('Mensaje', { exact: true }).fill('Consulta de integración sobre mi pedido.');
    await pagina.getByRole('button', { name: 'Enviar mensaje' }).click();
    await pagina.getByText('¡Mensaje enviado con éxito!').waitFor();
    await pagina.getByRole('button', { name: 'Cerrar sesión' }).click();
    await pagina.getByRole('link', { name: 'Iniciar Sesion' }).waitFor();
    await pagina.goto('/pedidos');
    await pagina.getByRole('heading', { name: 'Iniciar Sesión' }).waitFor();
  } finally { await navegador.close(); }
});
