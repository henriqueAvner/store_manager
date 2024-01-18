const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');
const { mockProducts,
  mockCurrProduct, 
  newProductMock } = require('../mocks/products.mock');

describe('Unit tests - SERVICE PRODUCTS:', function () {
  it('Retornando todos os produtos da lista', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(mockProducts);

    const responseData = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      
    ];
    const responseService = await productsServices.findAllProducts();
    
    expect(responseService.data).to.deep.equal(responseData);
    expect(responseService.data[0].name).to.deep.equal('Martelo de Thor');
  });
  it('Retornando um produto específico da lista', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(mockCurrProduct);

    const responseData = {
      id: 1,
      name: 'Martelo de Thor',
    };
    const inputData = 1;
    const responseService = await productsServices.findProductById(inputData);

    expect(responseService.status).to.equal('SUCCESS');
    expect(responseService).to.be.an('object');
    expect(responseService.data).to.deep.equal(responseData);
  });
  it('Adicionando um novo produto na lista', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves(newProductMock);

    const responseNewData = {
      id: 4,
      name: 'Manopla do infinito',
    };

    const responseService = await productsServices.insertNewProduct(responseNewData);

    expect(responseService.status).to.equal('CREATED');
    expect(responseService).to.be.an('object');
    expect(responseService.data).to.deep.equal(responseNewData);
  });

  afterEach(function () {
    sinon.restore();
  });
});