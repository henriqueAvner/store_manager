const productsModel = require('../models/products.model');
const serviceResponse = require('./messages/messages');

const findAllProducts = async () => {
  const allProducts = await productsModel.findAllProducts();
  return { status: 'SUCCESS', data: allProducts };
};

const findProductById = async (id) => {
  const currProduct = await productsModel.findProductById(id);

  if (!currProduct) {
    return {
      status: serviceResponse.NOT_FOUND,
      data: { message: 'Product not found' },
    };
  }
  return {
    status: serviceResponse.SUCCESS,
    data: currProduct,
  };
};

const insertNewProduct = async (name) => {
  const newProduct = await productsModel.insertProduct(name);
  return { status: 'CREATED', data: newProduct };
};

const updateProductService = async (id, name) => {
  const validateCurrProduct = await productsModel.findProductById(id);
  if (!validateCurrProduct) {
    return { status: serviceResponse.NOT_FOUND, data: { message: 'Product not found' } };
  }
  const currProduct = await productsModel.updateProductModel(id, name);

  return {
    status: serviceResponse.SUCCESS,
    data: currProduct,
  };
};

module.exports = {
  findAllProducts,
  findProductById,
  insertNewProduct,
  updateProductService,
};