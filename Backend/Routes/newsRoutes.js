import express from 'express';
import { getAgricultureNews } from '../controllers/newsController.js';

const router = express.Router();

router.get('/agriculture-news', getAgricultureNews);

export default router;
