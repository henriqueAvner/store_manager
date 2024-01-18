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

module.exports = {
  getAllSales,
  getSalesById,
};