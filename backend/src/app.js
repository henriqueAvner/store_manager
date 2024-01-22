const express = require('express');

const { productsController, salesController } = require('./controllers');
  
const { validNewProduct } = require('./middlewares/validateNewProducts.middleware');
const { validateQuantity,
  validateProductId,
  validateQuantityLength } = require('./middlewares/validateSale.middleware');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getAllProducts);

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

app.delete('/products/:id', productsController.deleteProductController);

module.exports = app;
