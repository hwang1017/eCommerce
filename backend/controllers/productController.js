import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@des     Fetch all prodcts
//@route   GET /api/products?keyword={keyword}
//@access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@des     Fetch single prodct
//@route   GET /api/products/:id
//@access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@des     Delete a prodct
//@route   DELETE /api/products/:id
//@access  Private / Admin
export const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@des     Creat a prodct
//@route   POST /api/products
//@access  Private / Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Smaple name',
    price: 0,
    user: req.user._id,
    image: '/image/sample.jpg',
    brand: 'smaple brand',
    category: 'sameple category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample des',
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

//@des     Update a prodct
//@route   PUT /api/products/;id
//@access  Private / Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@des     Create new review
//@route   POST /api/products/:id/reviews
//@access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const { rating, comment } = req.body;

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


//@des     Get top rated rproducts
//@route   POST /api/products/top
//@access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3) 
  
  res.json(products)
});
