const { salesModel } = require('../models');

const findSalles = async () => {
  const allSales = await salesModel.findAllSales();
  return allSales;
};

const findSaleById = async (id) => {
  const currSale = await salesModel.findSaleById(id);
  if (currSale < 1) {
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

module.exports = {
  findSalles,
  findSaleById,
    
};