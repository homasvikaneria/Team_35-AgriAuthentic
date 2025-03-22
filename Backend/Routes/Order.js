import express from 'express';
import {
  
  getConsumerOrders,
  getOrderDetails,
  getOrderStatus,
  getOrdersByFarmerId,
  getOrdersByConsumerId,
  
} from '../Controllers/orderController';

const router = express.Router();



router.get('/my-orders', getConsumerOrders);

router.get('/:orderId', getOrderDetails);

router.get('/:orderId/status', getOrderStatus);

router.get('/farmer/:farmerId', getOrdersByFarmerId);

router.get('/consumer/:consumerId', getOrdersByConsumerId);




export default router;