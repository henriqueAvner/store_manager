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

const controllerMock = { 
  status: 'SUCCESS', 
  data: mockProducts,
};

const controllerMockId = {
  status: 'SUCCESS',
  data: mockCurrProduct,
};

module.exports = {
  mockProducts,
  mockCurrProduct,
  controllerMock,
  controllerMockId,

};