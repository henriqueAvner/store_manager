const { salesModel, productsModel } = require('../models');
const serviceResponse = require('./messages/messages');

const findSalles = async () => {
  const allSales = await salesModel.findAllSales();
  return { status: 'SUCCESS', data: allSales };
};

const findSaleById = async (id) => {
  const currSale = await salesModel.findSaleById(id);

  if (currSale.length < 1) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    };
  }
  return {
    status: 'SUCCESS',
    data: currSale,
  };
};

const insertSale = async (sale) => {
  const promisses = sale.map((item) => productsModel.findProductById(item.productId));
  const resultPromisses = await Promise.all(promisses);

  for (let i = 0; i < resultPromisses.length; i += 1) {
    if (!resultPromisses[i]) {
      return { status: serviceResponse.NOT_FOUND, data: { message: 'Product not found' } };
    }
  }
  const newSale = await salesModel.insertNewSale(sale);

  return { status: serviceResponse.CREATED, data: newSale };
};

const deleteSale = async (saleId) => {
  const [currSale] = await salesModel.findSaleById(saleId);

  if (!currSale) {
    return { status: serviceResponse.NOT_FOUND, data: { message: 'Sale not found' } };
  }

  await salesModel.deleteSale(saleId);

  return { status: serviceResponse.NO_CONTENT, data: {} };
};

const updateQuantity = async (saleId, productId, quantity) => {
  const currSale = await salesModel.findSaleById(saleId);
  if (currSale.length === 0) {
    return { status: serviceResponse.NOT_FOUND, data: { message: 'Sale not found' } };
  }
  
  const validateSale = currSale.some((sale) => Number(sale.productId) === Number(productId));

  if (!validateSale) {
    return { status: serviceResponse.NOT_FOUND, data: { message: 'Product not found in sale' } };
  }

  await salesModel.updateQuantitySale(saleId, productId, quantity);
  const finalUpSale = await salesModel.selectQuantitySale(saleId, productId);

  return { status: serviceResponse.SUCCESS, data: finalUpSale };
};

module.exports = {
  findSalles,
  findSaleById,
  insertSale,
  deleteSale,
  updateQuantity,
    
};