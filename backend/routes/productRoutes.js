import express from 'express';
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//@des     Fetch all prodcts
//@route   GET /api/products
//@access  Public
router.route('/').get(getProducts).post(protect, admin, createProduct);

//@des     Fetch single prodct
//@route   GET /api/products/:id
//@access  Public
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProductById).put(protect, admin, updateProduct);

export default router;
