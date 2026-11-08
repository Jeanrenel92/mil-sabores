# Mil Sabores

## Acerca del proyecto

Mil Sabores es una aplicacion web desarrollada con React, TypeScript y Vite.
El proyecto se divide desde el inicio en dos areas:

- `client`: experiencia publica y funcionalidades para clientes.
- `admin`: gestion interna y funcionalidades para administradores.

Ambas areas comparten componentes comunes, servicios, rutas generales y estilos globales.
Vitest se utiliza para las pruebas automatizadas.

Este documento debe actualizarse cuando cambien las tecnologias, las responsabilidades
o las convenciones acordadas por el equipo.

## Tecnologias

- React 19
- TypeScript
- Vite
- Vitest
- ESLint
- CSS propio (sin Bootstrap)

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

## Estilos: sin Bootstrap

El proyecto no usa Bootstrap. Todo el diseno sale de CSS propio:

- `src/styles/global.css` define variables, reseteo, tipografias y clases base.
- Cada componente tiene su propio archivo CSS dentro de `src/styles`.
- Los componentes solo consumen las variables globales (colores, fuentes, espacios).

## Organizacion de carpetas

Los componentes se organizan con Atomic Design. El codigo (`.tsx`) vive en `src/components`
y los estilos (`.css`) viven en `src/styles`, replicando la misma estructura.

Algunas carpetas pueden quedar sin uso porque forman una estructura base preparada
para futuras evaluaciones. Deben utilizarse solo cuando el equipo necesite organizar codigo real.

```text
src/
  components/
    atoms/         Elementos basicos: Button, Input, Tag, Title.
    molecules/     Combinacion de atomos: FormField, SectionHeader, BlogCard.
    organisms/     Secciones completas reutilizables: Header, Footer, ContactForm.
  pages/
    client/        Paginas publicas y funcionalidades de clientes.
    admin/         Paginas protegidas y funcionalidades administrativas.
  templates/       Distribucion general reutilizada por paginas.
  routes/          Definicion de rutas y proteccion de accesos.
  services/        Comunicacion con APIs y servicios externos.
  context/         Estado compartido mediante Context API.
  hooks/           Hooks personalizados.
  types/           Tipos e interfaces compartidos.
  utils/           Funciones auxiliares.
  styles/
    global.css     Variables, reseteos, tipografias y clases base.
    components/
      atoms/       CSS de los atomos.
      molecules/   CSS de las moleculas.
      organisms/   CSS de los organismos.
    client/        CSS de paginas del area cliente.
    admin/         CSS de paginas del area administrativa.
  App.tsx          Componente raiz.
  main.tsx         Punto de entrada.

tests/             Pruebas unitarias e integracion.
public/            Recursos estaticos publicos.
```

### Responsabilidades de cliente y administrador

- Las paginas publicas se crean en `src/pages/client`.
- Las paginas administrativas se crean en `src/pages/admin`.
- Los componentes compartidos se ubican en `src/components`.
- Cliente y administrador comparten `src/styles/global.css` y los componentes.
- El CSS de cada pagina se ubica en `src/styles/client` o `src/styles/admin` segun su area.
- Las rutas administrativas deben validar los permisos correspondientes.
- Los servicios comunes deben compartirse y no duplicarse entre ambas areas.

## Convenciones de nombres

- Componentes TypeScript: `NombreComponente.tsx` (PascalCase).
- Archivos CSS: `nombreComponente.css` (camelCase), con el mismo nombre base que su componente.
- Componentes JavaScript con JSX: `NombreComponente.jsx`.
- JavaScript sin JSX: `nombreArchivo.js`.
- Variables, funciones y hooks usan camelCase.
- Componentes, interfaces y tipos usan PascalCase.
- Constantes globales pueden usar UPPER_SNAKE_CASE.

Ejemplo:

```text
src/components/molecules/FormField.tsx
src/styles/components/molecules/formField.css
```

El componente importa su hoja de estilos:

```tsx
import "../../styles/components/molecules/formField.css";
```

## Convenciones de estilos

| Ubicacion | Contenido |
| --- | --- |
| `src/styles/global.css` | Variables y estilos compartidos por cliente y administrador. |
| `src/styles/components/atoms/` | Estilos de atomos. |
| `src/styles/components/molecules/` | Estilos de moleculas. |
| `src/styles/components/organisms/` | Estilos de organismos. |
| `src/styles/client/` | Estilos de paginas del cliente. |
| `src/styles/admin/` | Estilos de paginas del administrador. |

Nombres de clases (BEM con prefijo del componente):

```css
.header__logo
.header__navigation
.formField__error
.button--primary
```

Reglas:

- Importar `global.css` una sola vez desde `src/main.tsx`.
- Importar el CSS de cada componente desde su propio `.tsx`.
- Centralizar colores, espacios y tipografias en variables CSS dentro de `global.css`.
- No repetir colores ni fuentes en los CSS de componentes: usar las variables.
- No usar estilos en linea mediante el atributo `style`.
- No mezclar estilos globales con estilos exclusivos de un componente.
- Evitar clases genericas que puedan afectar otra area.

## Componentes reutilizables

- Los componentes reciben props para personalizarse (variantes, textos, callbacks).
- Cada componente mantiene su logica dentro de su `.tsx`.
- Un componente nuevo debe revisarse contra los existentes antes de crearlo, para no duplicar.
- Los atomos y moleculas compartidos (por ejemplo `Button`, `FormField`, `SectionHeader`) se
  suben primero a `main` para que el resto del equipo los reutilice.

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
