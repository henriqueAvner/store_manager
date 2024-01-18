const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const chai = require('chai');
const { controllerMock, controllerMockId, mockCurrProduct } = require('../mocks/products.mock');
const { productsController } = require('../../../src/controllers');
const { productsServices } = require('../../../src/services');

chai.use(sinonChai);

describe('Unit test - PRODUCTS CONTROLLER:', function () {
  it('O status 200 deve ser chamado e json com a lista completa de produtos', async function () {
    // Arrange
    sinon.stub(productsServices, 'findAllProducts').resolves(controllerMock);
    const req = {};
    const res = {};
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();
    const allData = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
        
    ];

    // Act
    await productsController.getAllProducts(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allData);
  });
  it('Retorno o produto baseado em seu id pesquisado', async function () {
    // Arrange
    sinon.stub(productsServices, 'findProductById').resolves(controllerMockId);
    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Act
    await productsController.getProductsById(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockCurrProduct);
  });
  afterEach(function () {
    sinon.restore();
  });
});