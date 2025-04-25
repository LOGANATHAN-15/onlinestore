// Handle the form submission for adding a new product
const addProductForm = document.getElementById('addProductForm');
addProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get product data from the form
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;

  // Create the product object
  const product = {
    name: productName,
    price: parseFloat(productPrice)
  };

  try {
    // Send a POST request to add the product
    const response = await fetch('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      alert('Product added successfully!');
      fetchProducts();  // Refresh product list
    } else {
      alert('Failed to add product');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error adding product');
  }

  // Clear the form fields
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
});

// Handle the "Get Products" button click
const getProductsButton = document.getElementById('getProductsButton');
getProductsButton.addEventListener('click', fetchProducts);

// Fetch and display products
async function fetchProducts() {
  try {
    // Send a GET request to fetch all products
    const response = await fetch('/products');
    const products = await response.json();

    // Display the products in a list
    const productList = document.getElementById('productList');
    productList.innerHTML = '';  // Clear the list before adding new items

    products.forEach(product => {
      const li = document.createElement('li');
      li.classList.add('product');
      li.innerHTML = `${product.name} - $${product.price} <button onclick="deleteProduct(${product.id})">Delete</button>`;
      productList.appendChild(li);
    });
  } catch (error) {
    console.error('Error:', error);
    alert('Error fetching products');
  }
}

// Delete product by ID
async function deleteProduct(productId) {
  try {
    // Send a DELETE request to remove the product
    const response = await fetch(`/products/${productId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Product deleted successfully!');
      fetchProducts();  // Refresh the list
    } else {
      alert('Failed to delete product');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error deleting product');
  }
}
