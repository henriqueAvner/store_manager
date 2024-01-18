const express = require('express');

const { productsController, salesController } = require('./controllers');

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

module.exports = app;
