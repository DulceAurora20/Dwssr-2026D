import express from 'express';

const router = express.Router();

//Variable de estado de memoria
let counter = 0;
const numbers = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  counter++;
  numbers.push(counter);

  res.render('index', { title: 'Dulce Aurora',
    counter,
    numbers
   });
});

export default router;