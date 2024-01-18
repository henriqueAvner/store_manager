const { productsServices } = require('../services');
const httpMapCode = require('../utils/httpCodeMapper');

const getAllProducts = async (_req, res) => {
  const { status, data } = await productsServices.findAllProducts();
  return res.status(httpMapCode[status]).json(data);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsServices.findProductById(id);
  return res.status(httpMapCode[status]).json(data);
};

const addNewProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsServices.insertNewProduct(name);
  return res.status(httpMapCode[status])
    .json(data);
};

module.exports = {
  getAllProducts,
  getProductsById,
  addNewProduct,
    
};