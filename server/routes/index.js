import { Router } from 'express';
const router = Router();

let counter = 0;
let numbers = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  counter += 1;
  numbers.push(counter);

  res.render('index', { 
    title: 'Dulce Aurora',
    counter: counter,
    numbers: numbers 
  });
});

export default router;