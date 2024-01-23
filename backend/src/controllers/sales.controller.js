const { salesServices } = require('../services');
const httpMapCode = require('../utils/httpCodeMapper');

const getAllSales = async (_req, res) => {
  const { status, data } = await salesServices.findSalles();
  return res.status(httpMapCode[status]).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await salesServices.findSaleById(id);
  
  return res.status(httpMapCode[status]).json(data);
};

const addNewSale = async (req, res) => {
  const sale = req.body;
  const { status, data } = await salesServices.insertSale(sale);
  return res.status(httpMapCode[status])
    .json(data);
};

const deleteCurrSale = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await salesServices.deleteSale(id);

  return res.status(httpMapCode[status]).json(data);
};

const updateQuantityInSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await salesServices.updateQuantity(saleId, productId, quantity);
  return res.status(httpMapCode[status]).json(data);
};

module.exports = {
  getAllSales,
  getSalesById,
  addNewSale,
  deleteCurrSale,
  updateQuantityInSale,
};