// biblioteca file stream
import fs from 'node:fs';

// biblioteca de rutas
import path from 'node:path';

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// creando las variables de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*
Helper para Handlebars para que genere las etiquetas de Vite

EN DESARROLLO: Conecta al servidor de desarrollo de Vite
EN PRODUCCIÓN: Usa los compilados de Vite
*/

export function viteAssetHelper() {

    // Obtener modo de ejecución
    const isDev = process.env.NODE_ENV !== 'production';

    // Rescatando la URL del servidor de desarrollo
    const devServer =
        process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';

    // Si estamos en modo desarrollo
    if (isDev) {

        // En desarrollo, cargamos los archivos
        // del front-end directamente del servidor
        // de desarrollo de Vite

        return `
            <script type="module" src="${devServer}/@vite/client"></script>
            <script type="module" src="${devServer}/main.js"></script>
        `;
    }

    // En producción leemos el manifest
    // y generamos las etiquetas de script y link
    const manifestPath =
        path.join(__dirname, '..', '..', 'dist', 'manifest.json');

    // Si no existe el manifest
    if (!fs.existsSync(manifestPath)) {
        console.warn('Vite manifest not found. Run "npm run build" to generate it.'
        );
        return '';
    }
    // Leemos el contenido del manifest
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // Buscamos la entrada principal (por lo general main.js)
    const mainEntry = manifest['main.js'];

    let tags = '';

    // CSS files
    if (mainEntry && mainEntry.css) {
        mainEntry.css.forEach(cssfile => {
            tags += `<link rel="stylesheet" href="/${cssfile}">\n`;
        });
    }

    // JS files
    if (mainEntry && mainEntry.file) {
        tags += `<script type="module" src="/${mainEntry.file}"></script>\n`;
    }

    return tags;
} // <-- Esta llave cierra la función viteAssetHelper()

/*
* Función registradora del Helper de Handlebars
*/
export function registerViteHelper(hbs){
    hbs.registerHelper('viteAssets',()=>{
        // Sanitizando la salida del helper
        return new hbs.SafeString(viteAssetHelper())
    })
}