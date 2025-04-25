const express = require('express');
const router = express.Router();

// Example product data (In a real app, you would store this in a database)
let products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 },
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// POST a new product
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const id = products.length ? products[products.length - 1].id + 1 : 1; // Auto increment ID
  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE a product by id
router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex(product => product.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Remove the product from the array
  const deletedProduct = products.splice(productIndex, 1);

  // Respond with the deleted product
  res.status(200).json(deletedProduct);
});

module.exports = router;

