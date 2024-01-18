const productsServices = require('./products.service');
const salesServices = require('./sales.service');

module.exports = {
  productsServices,
  salesServices,
  
};

// Acabei de implementar a camada services para PRODUCTS E SALES.

// Proximos passos -> Realizar testes na camada service de products;
// -> Fazer a camada services para SALES;
// -> fazer testres para a camada service de SALES;
// -> Fazer a camada controller para services e sales;
// -> fazer testes para a camada controller de services e sales;