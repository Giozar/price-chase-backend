import express from 'express';
import { PriceController } from '../controllers/priceController';

const router = express.Router();

router.get('/fetch-prices', PriceController.fetchPrices);
router.get('/compare-prices', PriceController.getPriceComparison);
router.get('/prices', PriceController.getPrices);

export default router;
