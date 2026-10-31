![pleca_itgam](.devcontainer/assets/pleca_itgam.jpg)

# ✨🤍Desarrollo de aplicaciones web Server Side Rendering
 Proyecto de la materia de Desarrollo de aplicaciones web Server Side Rendering 

# 🚀Competencias a Desarrollar
El participante identifica los frameworks más utilizados en la industria para el desarrollo de aplicaciones web de pila completa y emplea uno de ellos para desarrollar aplicaciones web siguiendo las mejores prácticas de desarrollo.

# 🖼️ Convención de iconos para commits
### 🛠️ Iconografía para Commits en Desarrollo Web

Set esencial con los tipos de commit más habituales para proyectos frontend, backend y full-stack:

| Icono | Tipo de Commit | Contexto típico en Desarrollo Web |
| :---: | :--- | :--- |
| ✨ | `feat` | Componentes nuevos, rutas, vistas, integración de APIs o endpoints. |
| 🐛 | `fix` | Corrección de fallos en lógica, errores de renderizado o validaciones rotas. |
| 💄 | `style` / `ui` | Ajustes de CSS/Tailwind, diseño responsive, colores, tipografías y animaciones. |
| 🌐 | `api` / `network` | Configuración de Axios/Fetch, llamadas HTTP, contratos de datos o headers. |
| ♻️ | `refactor` | Limpieza o modularización de código sin alterar la experiencia de usuario. |
| ⚡️ | `perf` | Optimización de carga (lazy loading), compresión de imágenes, renderizado. |
| 📦️ | `deps` / `build` | Instalación o actualización de librerías (`npm`, `yarn`, `pnpm`, Vite, Webpack). |
| 🔧 | `config` / `chore` | Variables de entorno (`.env`), linters (ESLint, Prettier), Git hooks. |
| 🔒️ | `security` | Manejo de tokens, sanitización de inputs (XSS/CORS), roles y autenticación. |
| 📱 | `responsive` | Adaptación móvil, tablet, media queries y breakpoints de pantalla. |
| 📝 | `docs` | Documentación técnica, swagger/OpenAPI, guías de instalación en el README. |
| ✅ | `test` | Pruebas unitarias o de integración (Jest, Vitest, Cypress, Playwright). |
| 🚀 | `deploy` | Scripts de CI/CD, configuración para despliegue en Vercel, Netlify, Docker. |
| 🔥 | `remove` | Eliminación de código muerto, assets huérfanos o dependencias en desuso. |
---

# 🟩 Convención de Iconos para Commits
commit a1b2c3d'

# 🧹 Airbnb Base y Prettier

El proyecto aplica `eslint-config-airbnb-base` a JavaScript y usa `eslint-config-prettier`
para desactivar las reglas de formato de ESLint que podrían entrar en conflicto con Prettier.
La configuración plana de ESLint 8 carga Airbnb mediante `@eslint/eslintrc` (`FlatCompat`).

Instala las dependencias del proyecto con `npm install`. Comandos disponibles:

- `npm run lint:all`: analiza los archivos JavaScript del servidor y de `src/`.
- `npm run lint:fix`: corrige automáticamente los problemas que ESLint pueda arreglar.
- `npm run format`: aplica el formato de Prettier a los mismos archivos.
- `npm run format:check`: comprueba el formato sin modificar archivos.

La configuración del editor habilita ESLint Flat Config y la corrección automática al guardar.
