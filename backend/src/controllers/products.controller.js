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

const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { status, data } = await productsServices.updateProductService(id, name);
  return res.status(httpMapCode[status]).json(data);
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await productsServices.deleteProductService(id);

  return res.status(httpMapCode[status]).json(data);
};

const findProductByQuery = async (req, res) => {
  const searchProduct = req.query.q;
  const { status, data } = await productsServices.findQueryProducts(searchProduct);
 
  return res.status(httpMapCode[status]).json(data);
};

module.exports = {
  getAllProducts,
  getProductsById,
  addNewProduct,
  updateProductController,
  deleteProductController,
  findProductByQuery,
    
};