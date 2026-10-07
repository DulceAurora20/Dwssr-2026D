// (X) var createError = require('http-errors');
import createError from 'http-errors'
// var express = require('express');
import express from 'express'
// var path = require('path');
import path from 'node:path'
// var cookieParser = require('cookie-parser');
// IMPORTA MODULOS PARA MANEJAR COOKIES
import cookieParser from 'cookie-parser'
//var logger = require('morgan');
import logger from 'morgan'
//Importar para crear Diname
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

//Importando el template engine Handlebars
import hbs from 'hbs'

//Creando la variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//Crear el objeto Debug 
import createDebug from 'debug';
const debug = createDebug('dwssr-2026d:app');

//Importar la ruta de la aplicación
// var indexRouter = require('./routes/index');
// Importar las rutas de la aplicación usando el alias
import indexRouter from '#server/routes/index.js';
import usersRouter from '#server/routes/users.js';
//Importando el registrador del helper
import { registerViteHelper } from './helpers/hbs.helpers.js';
//Creando la aplicación 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//Archivos estaticos para produccion
if (process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname, 'dist')));
}

//Configurar la carpeta de archivos estaticos
debug("🪄Creando servidor de Archivos Estáticos")
app.use(express.static(path.join(__dirname, 'public')));

//Registrando las rutas de la aplicación
debug("🗺️ Registrando rutas")
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app;