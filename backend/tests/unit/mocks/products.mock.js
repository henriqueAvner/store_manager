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

const newProductMock = {
  id: 4,
  name: 'Manopla do infinito',
};

const controllerNewProduct = {
  status: 'CREATED',
  data: newProductMock,
};

const mockInsert = {
  
  fieldCount: 0,
  affectedRows: 1,
  insertId: 4,
  info: '',
  serverStatus: 2,
  warningStatus: 0,
  
};

module.exports = {
  mockProducts,
  mockCurrProduct,
  controllerMock,
  controllerMockId,
  newProductMock,
  controllerNewProduct,
  mockInsert,

};