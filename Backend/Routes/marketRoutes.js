import express from "express";
import { getHighestPrices, predictBestSellingTime } from "../Controllers/marketController.js";

const router = express.Router();

router.get("/highest-prices", getHighestPrices);
router.get("/predict-time", predictBestSellingTime);

export default router;
