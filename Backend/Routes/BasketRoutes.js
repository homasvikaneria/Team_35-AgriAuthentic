import express from 'express';
import {
  getBasket,
  addToBasket,
  deleteFromBasket
  // updateBasketItem,
  // removeFromBasket,
  // clearBasket
} from '../controllers/basketContoller.js';

const router = express.Router();

router.get('/:consumerId', getBasket); 
router.post('/add', addToBasket); 
router.delete('/:consumerId/basket/:productId', deleteFromBasket);

export default router;