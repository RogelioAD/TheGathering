import { Router } from 'express';
import { allCoffee, oneCoffee, addCoffeePage,
    addCoffee, editCoffeePage, editCoffee, deleteCoffee } from '../controllers/coffeeController';

const router = Router();

// GET /coffee - renders a list of coffee items
router.get('/', allCoffee);

// GET /coffee/add - render the add coffee item page
router.get('/add', addCoffeePage);

// POST /coffee/add - add coffee item to array
router.post('/add', addCoffee);

// GET /coffee/edit/:coffeeId - render the edit coffee page
router.get('/edit/:coffeeId', editCoffeePage);

// POST /coffee/edit/:coffeeId - render the edit coffee page
router.post('/edit/:coffeeId', editCoffee);

// POST /coffee/delete/:coffeeId - delete coffee item
router.post('/delete/:coffeeId', deleteCoffee);

// GET /coffee/:coffeeId - render the coffee item requested
router.get('/:coffeeId', oneCoffee);

export default router;