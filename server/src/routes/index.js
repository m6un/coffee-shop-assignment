import { Router } from 'express';
import {
  getCoffeeShopDetailsController,
  getCoffeeShopsController,
} from '../controllers/coffeshop.controller.js';

const router = Router();

// coffee shop routes
router.get('/', getCoffeeShopsController);

router.get('/shop/:id', getCoffeeShopDetailsController);

export default router;
