const express = require('express');
const app = express();
const port = 8080;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Serve static files (HTML, CSS, JavaScript) from the 'public' directory
app.use(express.static('public'));

// Routes (make sure you have the '/products' routes in your products.js file as discussed earlier)
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

// Basic welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Online Store API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

