import express from 'express';
import {
  registerFarmer,
  getFarmerById,
  getAllFarmers
} from '../Controllers/farmerController.js';

const router = express.Router();

router.post('/register', registerFarmer);
router.get('/:id', getFarmerById);
router.get('/', getAllFarmers);

export default router;