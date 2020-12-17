import express from 'express';
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';

const router = express.Router();

//@des     Fetch all prodcts
//@route   GET /api/products
//@access  Public
router.route('/').get(getProducts);

//@des     Fetch single prodct
//@route   GET /api/products/:id
//@access  Public
router.route('/:id').get(getProductById);

export default router;
