import { Router } from 'express';
const router = Router();

let counter = 0;
let numbers = [];

//Variable de estado de memoria
let counter = 0;
const numbers = [];

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  counter += 1;
  numbers.push(counter);

  res.render('index', { 
    title: 'Dulce Aurora',
    counter: counter,
    numbers: numbers 
  });
=======
  counter++;
  numbers.push(counter);

  res.render('index', { title: 'Dulce Aurora',
    counter,
    numbers
   });
>>>>>>> 6465271e0b18cc4a1dbf098529ef506399cad466
});

export default router;