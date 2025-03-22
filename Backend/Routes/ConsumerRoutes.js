import express from 'express';
import {
  getConsumerProfile,
  addAddress,
  getConsumerOrders,
  registerConsumer
} from '../Controllers/ConsumerController.js';

const router = express.Router();


router.post('/register', registerConsumer);
router.route('/profile')
.get(getConsumerProfile)
  
router.post('/address', addAddress);
router.get('/orders', getConsumerOrders);

export default router; 