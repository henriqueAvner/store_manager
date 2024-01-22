const { salesModel } = require('../models');
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
  const newSale = await salesModel.insertNewSale(sale);
  const { itemsSold } = newSale;

  for (let i = 0; i < itemsSold.length; i += 1) {
    if (!itemsSold[i].productId) {
      return { status: serviceResponse.NOT_FOUND, data: { message: 'Product not found' } };
    }
  }

  return { status: serviceResponse.CREATED, data: newSale };
};

module.exports = {
  findSalles,
  findSaleById,
  insertSale,
    
};