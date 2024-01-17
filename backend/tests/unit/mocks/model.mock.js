const mockProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },

];

const mockCurrProduct = {
  id: 1,
  name: 'Martelo de Thor',
};

const dateTime = '2024-01-17T21:31:44.000Z';

const mockSales = [
  
  {
    saleId: 1,
    date: dateTime,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateTime,
    productId: 2,
    quantity: 10,
  },

];

module.exports = {
  mockProducts,
  mockCurrProduct,
  mockSales,
  
};