const express = require('express');

const { productsServices, salesServices } = require('./services');
const httpMapCode = require('./utils/httpCodeMapper');

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
  const { status, data } = await productsServices.findProductById(id);
  return res.status(httpMapCode[status]).json(data);
});

app.get('/sales', async (_req, res) => {
  const allSales = await salesServices.findSalles();
  return res.status(200).json(allSales);
});

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.findSaleById(id);

  return res.status(httpMapCode[status]).json(data);
});

module.exports = app;
