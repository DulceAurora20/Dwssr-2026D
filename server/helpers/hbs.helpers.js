// biblioteca file stream
import fs from 'node:fs';

// biblioteca de rutas
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// creando las variables de rutas de forma compatible con Airbnb y módulos ES
const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);

/*
Helper para Handlebars para que genere las etiquetas de Vite

EN DESARROLLO: Conecta al servidor de desarrollo de Vite
EN PRODUCCIÓN: Usa los compilados de Vite
*/

export function viteAssetHelper() {
  // Obtener modo de ejecución
  const isDev = process.env.NODE_ENV !== 'production';

  // Rescatando la URL del servidor de desarrollo
  const devServer = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';

  // Si estamos en modo desarrollo
  if (isDev) {
    return `
      <script type="module" src="${devServer}/@vite/client"></script>
      <script type="module" src="${devServer}/src/main.js"></script>
    `;
  }

  // En producción leemos el manifest buscando en ambas ubicaciones posibles
  const manifestPathDirect = path.join(currentDir, '..', '..', 'dist', 'manifest.json');
  const manifestPathViteDir = path.join(currentDir, '..', '..', 'dist', '.vite', 'manifest.json');

  const manifestPath = fs.existsSync(manifestPathViteDir)
    ? manifestPathViteDir
    : manifestPathDirect;

  // Si no existe el manifest en ninguna de las dos rutas
  if (!fs.existsSync(manifestPath)) {
    // eslint-disable-next-line no-console
    console.warn('Vite manifest not found. Run "npm run build" to generate it.');
    return '';
  }

  // Leemos el contenido del manifest
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Buscamos la entrada principal
  const mainEntry = manifest['src/main.js'] || manifest['main.js'];

  let tags = '';

  // CSS files
  if (mainEntry && mainEntry.css) {
    mainEntry.css.forEach((cssfile) => {
      tags += `<link rel="stylesheet" href="/${cssfile}">\n`;
    });
  }

  // JS files
  if (mainEntry && mainEntry.file) {
    tags += `<script type="module" src="/${mainEntry.file}"></script>\n`;
  }

  return tags;
}

/*
- Función registradora del Helper de Handlebars
*/
export function registerViteHelper(hbs) {
  hbs.registerHelper('viteAssets', () => new hbs.SafeString(viteAssetHelper()));
}