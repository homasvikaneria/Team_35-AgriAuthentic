import express from 'express';
import {
  getAllProducts,
  getProductById,
  getVerificationDetails,
  createProduct,
  getProductsByFarmerId // Import the new controller method
} from '../Controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/:id/verify', getVerificationDetails);
router.post('/', createProduct); // Add this line
router.get('/farmer/:farmerId', getProductsByFarmerId);


export default router;