// Funcion para manejar errores
import createError from 'http-errors';
// Importa el framework express
import express from 'express';
// Importa los modulos para manejar rutas
import path, { dirname } from 'node:path';
// Importa modulos para las cookies
import cookieParser from 'cookie-parser';
// Importa modulos para manejar logs
import logger from 'morgan';

// importar rutas de la aplicacion
// eslint-disable-next-line import-x/no-rename-default
import indexRouter from '#routes/index.js';
// eslint-disable-next-line import-x/no-rename-default
import usersRouter from '#routes/users.js';

// importando el registrador del helper
import createdebug from 'debug';

// imports para crear dirname
import { fileURLToPath } from 'node:url';

// importanto el tempplate engine Hadlebars
import hbs from 'hbs';
import { registrarViteHelper } from './lib/vite.js';
// eslint-disable-next-line import-x/no-rename-default
import winstonLogger from './lib/winston.js';

const debug = createdebug('dwssr-2026d:server');

// creando la variables de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

debug('Aplicación inicializada correctamente');

// Crea la aplicacion express
const app = express();

// Configurar el motor de visitas con hbs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// registro Helper
registrarViteHelper(hbs);

// ==========================================
// INTEGRACIÓN VITE COMO MIDDLEWARE
// ==========================================
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line import-x/no-extraneous-dependencies
  const { createServer } = await import('vite');
  const viteDevServer = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(viteDevServer.middlewares);
}
// ==========================================

// Configura los middlewares
app.use(logger('combined', {
  stream: {
    write: (message) => winstonLogger.http(message.trim()),
  },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// archivos estaticos para produccion
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

debug('Carpeta de archivos');
// Configura la carpeta de los archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

debug('Rutas de aplicacion');
// registramos rutas de la aplicacion
app.use('/', indexRouter);
app.use('/users', usersRouter);

// capturamos el error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;