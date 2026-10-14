const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const hbsHelpers = require('./server/helpers/hbs.helpers');
const indexRouter = require('./server/routes/index');
const usersRouter = require('./server/routes/users');

const app = express();

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'server/views'),
  helpers: hbsHelpers
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'server/views'));

// Servir la carpeta dist de manera directa
app.use(express.static(path.join(process.cwd(), 'dist')));
app.use('/assets', express.static(path.join(process.cwd(), 'dist/assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
