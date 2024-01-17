const express = require('express');
const { salesModel } = require('./models');
const { productsServices } = require('./services');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_req, res) => {
  const allProducts = await productsServices.findAllProducts();
  return res.status(200).json(allProducts);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const currProduct = await productsServices.findProductById(id);
  return res.status(200).json(currProduct);
});

app.get('/sales', async (_req, res) => {
  const allSales = await salesModel.findAllSales();
  return res.status(200).json(allSales);
});

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;

  const filterSales = await salesModel.findSaleById(id);
  
  if (filterSales.length < 1) {
    return res.status(404).send({ message: 'Sale not found' });
  }
  return res.status(200).json(filterSales);
});

module.exports = app;
