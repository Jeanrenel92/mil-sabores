# Mil Sabores

## Acerca del proyecto

Mil Sabores es una aplicacion web desarrollada con React, TypeScript y Vite.
El proyecto se divide desde el inicio en dos areas:

- `client`: experiencia publica y funcionalidades para clientes.
- `admin`: gestion interna y funcionalidades para administradores.

Ambas areas comparten componentes comunes, servicios, rutas generales y estilos globales.
Vitest se utiliza para las pruebas automatizadas.

Este documento temporal debe actualizarse cuando cambien las tecnologias, las responsabilidades
o las convenciones acordadas por el equipo.

## Tecnologias

- React 19
- TypeScript
- Vite
- Vitest
- ESLint
- Bootstrap 5, opcional y no instalado por defecto

## Instalacion

Ejecutar los comandos dentro de la terminal, desde el directorio donde se quieran guardar los proyectos:

```bash
git clone <URL_DEL_REPOSITORIO>
cd mil-sabores
npm install
```

Las versiones y dependencias quedan registradas en `package.json` y `package-lock.json`.

## Comandos disponibles

| Comando | Uso |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Verifica TypeScript y genera la compilacion de produccion. |
| `npm run lint` | Revisa los archivos con ESLint. |
| `npm test -- --run` | Ejecuta todas las pruebas una vez. |
| `npm run preview` | Previsualiza la compilacion de produccion. |

## Bootstrap opcional

Bootstrap no forma parte de la configuracion predeterminada. Si el equipo acuerda usarlo:

```bash
npm install bootstrap
```

Importarlo una sola vez en `src/main.tsx`:

```tsx
import "bootstrap/dist/css/bootstrap.min.css";
```

Se recomienda evitar clases utilitarias repetidas en JSX y mantener los estilos propios en CSS.

## Organizacion de carpetas

Esta actividad corresponde a la segunda evaluacion. Por ello, algunas carpetas creadas pueden
quedar sin uso porque forman una estructura base preparada para futuras evaluaciones.
Las carpetas actuales deben utilizarse solo cuando el equipo necesite organizar codigo real.

Atomic Design es opcional. Puede usarse como alternativa para organizar los componentes,
pero no es obligatorio crear carpetas de atomos, moleculas u organismos.

```text
src/
  components/
    atoms/       Opcion opcional para elementos basicos: botones, inputs e iconos.
    molecules/   Opcion opcional para combinar varios atomos.
    organisms/   Opcion opcional para secciones completas reutilizables.
    Button/      Los componentes tambien pueden colocarse directamente sin clasificar.
  pages/
    client/      Paginas publicas y funcionalidades de clientes.
    admin/       Paginas protegidas y funcionalidades administrativas.
  templates/     Distribucion general reutilizada por paginas.
  routes/        Definicion de rutas y proteccion de accesos.
  services/      Comunicacion con APIs y servicios externos.
  context/       Estado compartido mediante Context API.
  hooks/         Hooks personalizados.
  types/         Tipos e interfaces compartidos.
  utils/         Funciones auxiliares.
  styles/
    global.css   Variables, reseteos, tipografias y estilos comunes.
    components/  Estilos de componentes compartidos.
    pages/       Estilos de paginas compartidas.
    client/      Estilos exclusivos del area cliente.
    admin/       Estilos exclusivos del area administrativa.
  App.tsx        Componente raiz.
  main.tsx       Punto de entrada.

tests/           Pruebas unitarias e integracion.
public/          Recursos estaticos publicos.
```

### Responsabilidades de cliente y administrador

- Las paginas publicas se crean en `src/pages/client`.
- Las paginas administrativas se crean en `src/pages/admin`.
- Los componentes compartidos se ubican en `src/components`.
- Cliente y administrador comparten `src/styles/global.css`.
- Los estilos exclusivos de cada area se ubican en `src/styles/client` y `src/styles/admin`.
- Las rutas administrativas deben validar los permisos correspondientes.
- Los servicios comunes deben compartirse y no duplicarse entre ambas areas.
- El CSS global es suficiente cuando cubre los estilos compartidos por todas las paginas.
- No es obligatorio crear un archivo CSS por pagina si esta reutiliza correctamente el estilo global.
- Los archivos exclusivos para cliente y administrador son opcionales. Solo deben crearse cuando sus
  disenos necesitan reglas distintas y no pueden resolverse mediante clases globales.

## Convenciones de nombres

- Componentes TypeScript: `NombreComponente.tsx`.
- Componentes JavaScript con JSX: `NombreComponente.jsx`.
- JavaScript sin JSX: `NombreComponente.js`.
- Variables, funciones y hooks usan camelCase.
- Componentes, interfaces y tipos usan PascalCase.
- Constantes globales pueden usar UPPER_SNAKE_CASE.
- Cada hoja CSS particular debe tener el mismo nombre base que el componente.

Ejemplo:

```text
src/components/Button/
  Button.tsx
  Button.css
```

El componente importa su hoja de estilos:

```tsx
import "./Button.css";
```

## Convenciones de estilos

- `src/styles/global.css`: estilos y variables compartidos por cliente y administrador.
- `src/styles/components/Nombre.css`: estilos de componentes compartidos.
- `src/styles/pages/Nombre.css`: estilos de paginas compartidas.
- `src/styles/client/Nombre.css`: estilos exclusivos del cliente.
- `src/styles/admin/Nombre.css`: estilos exclusivos del administrador.
- `Nombre.module.css` puede usarse como alternativa local.

Los estilos particulares son opcionales:

- Una pagina puede usar solo `global.css` si sus estilos ya estan cubiertos.
- `styles/client` debe utilizarse solo para estilos exclusivos del area cliente.
- `styles/admin` debe utilizarse solo para estilos exclusivos del area administrativa.
- Un componente tambien puede usar su CSS propio solo si sus estilos necesitan independencia.

Ejemplo de clases:

```css
.header-ms__logo
.header-ms__navigation
```

Reglas:

- Importar `global.css` una sola vez desde `src/main.tsx`.
- Importar el CSS particular desde el componente que lo utiliza.
- No mezclar estilos globales con estilos exclusivos.
- No usar estilos en linea mediante el atributo `style`.
- Evitar clases genericas que puedan afectar otra area.
- Centralizar colores, espacios y tipografias en variables CSS dentro de `global.css`.

## Trabajo colaborativo con Git

Cada companero debe trabajar en una rama propia.
No se permiten commits directos sobre `main`.

- Los nombres de rama deben describir la tarea:
  `feature/catalogo`, `fix/validacion-login` o `docs/actualizar-readme`.
- Los commits deben tener mensajes claros, breves y descriptivos.
- Antes de comenzar el trabajo y con frecuencia durante el dia, actualizar `main` y sincronizar la rama personal.
- Las ramas deben subirse al repositorio para que el equipo pueda revisarlas.
- Al finalizar cada jornada, crear un pull request hacia `main`.
- Cada pull request debe pasar las verificaciones y recibir revision de al menos un companero.
- Los conflictos deben resolverse dentro de la rama personal antes de crear o actualizar el pull request.

Ejemplo:

```bash
# Actualizar main y crear una rama de trabajo
git switch main
git pull origin main
git switch -c feature/nombre-de-la-funcionalidad

# Guardar cambios con un mensaje claro
git add .
git commit -m "Agregar listado de productos para clientes"

# Publicar la rama
git push origin feature/nombre-de-la-funcionalidad
```

Para revisar una rama publicada por un companero, primero guardar el trabajo propio:

```bash
git status
git switch feature/nombre-de-la-rama-propia
git fetch origin
git switch --track origin/feature/rama-del-companero
```

Para volver al trabajo propio:

```bash
git switch feature/nombre-de-la-rama-propia
```

Antes de subir cambios nuevamente, sincronizar con `main` y resolver conflictos en la rama personal:

```bash
git switch main
git pull origin main
git switch feature/nombre-de-la-rama-propia
git merge main
```

## Verificacion antes de entregar

Comunicar la funcionalidad que se modificara, revisar el trabajo de otros miembros y ejecutar:

```bash
npm run lint
npm test -- --run
npm run build
git status
```

Luego crear el pull request hacia `main`.
No fusionar directamente cambios a `main` sin revision y sin las verificaciones anteriores.

## Reglas generales del equipo

- Evitar modificar archivos ajenos sin coordinacion previa.
- Mantener componentes pequenos, reutilizables y con una sola responsabilidad.
- No incluir credenciales, tokens, claves privadas ni datos sensibles.
- No enviar archivos generados como `node_modules` y `dist`.
- No aprobar ni fusionar el propio trabajo sin revision del equipo.
- Mantener actualizados nombres de ramas, rutas principales y convenciones en este README.
