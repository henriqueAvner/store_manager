const productsModel = require('../models/products.model');

const findAllProducts = async () => {
  const allProducts = await productsModel.findAllProducts();
  return allProducts;
};

const findProductById = async (id) => {
  const currProduct = await productsModel.findProductById(id);

  if (!currProduct) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    };
  }
  return {
    status: 'SUCCESS',
    data: currProduct,
  };
};

module.exports = {
  findAllProducts,
  findProductById,
};