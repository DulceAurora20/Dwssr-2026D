import { Router } from 'express';

const router = Router();

// Variable de estado de memoria
let counter = 0;
const numbers = [];

/* GET home page. */
router.get('/', (_req, res) => {
  counter += 1;
  numbers.push(counter);

  res.render('index', {
    title: 'Dulce Aurora',
    counter,
    numbers,
  });
});

export default router;