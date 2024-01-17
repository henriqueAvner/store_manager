const productsModel = require('../models/products.model');

const findAllProducts = async () => {
  const allProducts = await productsModel.findAllProducts();
  return allProducts;
};

const findProductById = async (id) => {
  const currProduct = await productsModel.findProductById(id);

  if (!currProduct) {
    return 'Product not found';
  }
  return currProduct;
};

module.exports = {
  findAllProducts,
  findProductById,
};