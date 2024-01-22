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

const mockSaleId = [
  {
    date: '2024-01-18T02:35:00.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2024-01-18T02:35:00.000Z',
    productId: 2,
    quantity: 10,
  },
];
const controllerMock = { 
  status: 'SUCCESS', 
  data: mockSales,
};

const controllerMockId = {
  status: 'SUCCESS',
  data: mockSaleId,
};

const saleWithoutQuantity = [ 
  {
    productId: 1,     
  },
  {
    productId: 2,      
  },  
];
const saleWithoutProductId = [
  { 
    quantity: 1,
  },
  { 
    quantity: 5,  
  },
];
const quantityWithoutValue = [
  {
    productId: 4,
    quantity: 0,
  },
];
const fullSale = {
  id: 3,
  itemsSold: [
    {
      
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  mockSales,
  mockSaleId,
  controllerMock,
  controllerMockId,
  saleWithoutQuantity,
  saleWithoutProductId,
  fullSale,
  quantityWithoutValue,
  
};