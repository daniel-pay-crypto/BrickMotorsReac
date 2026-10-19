# BrickMotorsReac

Esta es la tienda online de **Brick Motors**, una tienda de sets LEGO (Technic, Star Wars y MOC) hecha en React. Es la segunda versión del proyecto: primero la hicimos con HTML, CSS y JavaScript (repo `BrickMotors`) y ahora la pasamos a React para la evaluación 2 de Desarrollo Fullstack II.

Repo: https://github.com/daniel-pay-crypto/BrickMotorsReac

## Integrantes

- Daniel Leyton, Thomás Osorio, Felipe Baes

## Qué usamos

- **React + Vite** para armar la página
- **react-router-dom** para moverse entre páginas
- **react-bootstrap** (Bootstrap) para botones, tablas, formularios, etc.
- **Karma + Jasmine + Testing Library** para las pruebas unitarias (lo que nos pidió el profe)

## Cómo correrlo

Primero instalar todo:

```
npm install
```

Después levantar la página:

```
npm run dev
```

Y abrir `http://localhost:5173/` en el navegador.

## Cómo están ordenadas las carpetas

Usamos la idea de **atoms, molecules y organisms** (átomos, moléculas y organismos). Básicamente es ir armando la página de lo más chico a lo más grande:

- **atoms**: lo más chico, una sola cosa (un botón, un input, un texto)
- **molecules**: unos cuantos atoms juntos (un campo de formulario = etiqueta + input + mensaje de error)
- **organisms**: partes grandes de la página (el navbar, el footer, un formulario completo)
- **pages**: las páginas completas, que juntan organisms


## Las páginas

| Página | Ruta | Qué hace |
|---|---|---|
| Home | `/` | página principal con el banner y los productos destacados |
| Productos | `/productos` | lista de todos los productos |
| ProductDetail | `/products/:id` | el detalle de un producto |
| Contacto | `/contacto` | formulario para mandar un mensaje |
| Administración | `/admin` | panel para manejar productos y usuarios |
| DetalleBlog | `/blog/:id` | un artículo del blog completo |
| Categorias y Ofertas | | páginas extra de la tienda |

### Contacto

Tiene tres campos: nombre, correo y mensaje. Las validaciones son:

- Ningún campo puede quedar vacío
- El correo tiene que ser un `@gmail.com` bien escrito

Si algo está mal sale el mensaje de error en rojo debajo del campo. Si está todo bien sale un mensaje de que se envió y se limpia el formulario.

### Administración

Es un panel con un menú al lado izquierdo donde se cambia entre **Productos** y **Usuarios**. En cada uno hay una tabla y un botón para agregar uno nuevo.

- **Productos**: código, nombre, precio, stock y categoría (Technic, Star Wars o MOC)
- **Usuarios**: nombre, correo y tipo (Administrador, Vendedor o Cliente)

Las validaciones son las mismas de contacto: nada vacío y correo `@gmail.com`.

*Por ahora los datos se guardan solo en memoria, así que si se recarga la página se pierden los que agregamos.

### Blog

Hay 3 artículos guardados en `data/blogData.js`. La página `DetalleBlog` agarra el número de la ruta (por ejemplo `/blog/2`) y muestra ese artículo con el componente `ArticuloBlog`. También cambia el título de la pestaña del navegador. Si ponen un número que no existe, muestra el artículo 1.

## Los estilos

Usamos Bootstrap para lo básico y CSS propio para lo demás. La idea es:

- En `index.css` / `global.css` solo va lo general: los colores de Brick Motors como variables (`:root`), el reset y el fondo de la página
- El CSS de cada componente va en un archivo `.css` al lado de su `.jsx` (por ejemplo `Navbar.css` junto a `Navbar.jsx`) y se importa dentro del componente

## Pruebas unitarias

Nos pidieron **3 pruebas por cada componente**. Seguimos la guía que nos mando (Karma + Jasmine + Testing Library). Las pruebas están en `src/test/` y tienen la misma estructura que `components` y `pages`.

Para correrlas:

```
npm run test
```

Si queremos que se queden corriendo mientras editamos:

```
npm run test:watch
```

Cuando se corren se crea sola una carpeta `coverage` con el reporte.

### Qué probamos

| Componente | Qué revisan las 3 pruebas |
|---|---|
| Input | placeholder, que se marque inválido, que ejecute `onChange` |
| Select | placeholder, las opciones, que ejecute `onChange` |
| FormField | la etiqueta, que el input quede unido a su etiqueta, el mensaje de error |
| SelectField | la etiqueta, las opciones, el mensaje de error |
| TablaDatos | títulos de columnas, datos de las filas, cantidad de filas |
| FormularioContacto | errores con todo vacío, correo que no es gmail, envío correcto |
| AdminProductos | productos de ejemplo, errores al guardar vacío, agregar uno nuevo |
| AdminUsuarios | usuario de ejemplo, errores al guardar vacío, agregar uno nuevo |
| PanelAdmin | menú lateral, sección por defecto, cambiar a usuarios |
| ArticuloBlog | título y fecha, imagen, subtítulos y párrafos |
| Contacto (página) | navbar, formulario, footer |
| Administracion (página) | título del panel, tabla de productos, enlace para volver |
| DetalleBlog (página) | artículo según la ruta, título de la pestaña, id que no existe |

### Cómo lo configuramos

Lo que instalamos (sale en la guia que el profe nos mando):

```
npm install --save-dev karma karma-jasmine jasmine-core karma-chrome-launcher karma-webpack karma-babel-preprocessor karma-jasmine-html-reporter karma-coverage
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react style-loader css-loader
npm install --save-dev @testing-library/react @testing-library/jasmine-dom
```

Y los archivos de configuración: `karma.conf.cjs`, `babel.config.cjs` y `src/test/setupTests.js`. En `package.json` agregamos los scripts `test` y `test:watch`.

### Problemas que nos salieron

- **"Cannot find module" en las pruebas**: nos pasó cuando dejamos un archivo `.spec.jsx` en la carpeta equivocada. Los imports cuentan cuántas carpetas hay que subir, así que cada prueba tiene que estar en la misma ruta que el componente (`test/components/organisms/` para organisms, `test/pages/` para pages).
- **"Can't resolve '/img/...'" con el CSS**: en Karma, webpack trataba de buscar las imágenes del CSS como si fueran archivos de `src`. Lo arreglamos en `karma.conf.cjs` poniéndole `url: false` al `css-loader`:

```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { url: false } },
  ],
},
```

## Lo que falta

- Que el login funcione de verdad y que `/admin` solo se pueda abrir con un usuario administrador
- Carrito de compras que funcione
- Guardar los datos en una base de datos (ahora está todo en memoria)