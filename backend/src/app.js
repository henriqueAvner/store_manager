const express = require('express');

const { productsController, salesController } = require('./controllers');
  
const { validNewProduct } = require('./middlewares/validateNewProducts.middleware');
const { validateQuantity,
  validateProductId,
  validateQuantityLength,
  validateQuantityObject,
  validateQuantityObjLength } = require('./middlewares/validateSale.middleware');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getAllProducts);

app.get('/products/search', productsController.findProductByQuery);

app.get('/products/:id', productsController.getProductsById);

app.get('/sales', salesController.getAllSales);

app.get('/sales/:id', salesController.getSalesById);

app.post('/products', validNewProduct, productsController.addNewProduct);

app.post(
  '/sales', 
  validateQuantityLength, 
  validateProductId,
  validateQuantity,
  salesController.addNewSale,
);

app.put('/products/:id', validNewProduct, productsController.updateProductController);

app.put(
  '/sales/:saleId/products/:productId/quantity', 
  validateQuantityObject,
  validateQuantityObjLength,
  salesController.updateQuantityInSale,
);

app.delete('/products/:id', productsController.deleteProductController);

app.delete('/sales/:id', salesController.deleteCurrSale);

module.exports = app;
