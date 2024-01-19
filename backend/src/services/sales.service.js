const { salesModel } = require('../models');
// const serviceResponse = require('./messages/messages');

const findSalles = async () => {
  const allSales = await salesModel.findAllSales();
  return { status: 'SUCCESS', data: allSales };
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

const insertSale = async (sale) => {
  const newSale = await salesModel.insertNewSale(sale);
  // console.log(newSale);
  // newSale.forEach((currSale) => {
  //   if (!currSale.quantity) {
  //     return { status: serviceResponse.INVALID_DATA, message: '"quantity" is required' };
  //   }
  //   if (!currSale.productId) {
  //     return { status: serviceResponse.INVALID_DATA, message: '"productId" is required' };
  //   }
  //   if (currSale.quantity <= 0) {
  //     return { status: serviceResponse.UNPROCESSABLE_ENTITY, 
  //       message: '"quantity" must be greater than or equal to 1' };
  //   }
  // });
  return { status: 'CREATED', data: newSale };
};

module.exports = {
  findSalles,
  findSaleById,
  insertSale,
    
};