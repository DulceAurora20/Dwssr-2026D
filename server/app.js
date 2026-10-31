import createError from 'http-errors';
import express from 'express';
import path, { dirname } from 'node:path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'node:url';

// Importando el template engine Handlebars
import hbs from 'hbs';

// Crear el objeto Debug
import createDebug from 'debug';

// Importar Las rutas de la aplicación con la extensión .js para Node.js
// eslint-disable-next-line import/extensions
import indexRouter from './routes/index.js';
// eslint-disable-next-line import/extensions
import usersRouter from './routes/users.js';
// Importando el registrador del helper
// eslint-disable-next-line import/extensions
import { registerViteHelper } from './helpers/hbs.helpers.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const debug = createDebug('dwssr-2026d:app');
debug('Iniciando aplicación de Express...'); // Usamos debug para que no marque no-unused-vars

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Registrar los helpers de Vite para Handlebars
registerViteHelper(hbs);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler - se agrega 'next' para cumplir con la firma de middleware de Express
// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;