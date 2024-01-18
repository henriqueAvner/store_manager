const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const chai = require('chai');
const { controllerMock, 
  controllerMockId, 
  mockSaleId, 
  mockSales } = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');
const { salesServices } = require('../../../src/services');

chai.use(sinonChai);

describe('Unit test - SALES CONTROLLER:', function () {
  it('O status 200 deve ser chamado e json com a lista completa de produtos', async function () {
    // Arrange
    sinon.stub(salesServices, 'findSalles').resolves(controllerMock);
    const req = {};
    const res = {};
    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub();

    // Act
    await salesController.getAllSales(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSales);
  });
  it('Retorno o produto baseado em seu id pesquisado', async function () {
    // Arrange
    sinon.stub(salesServices, 'findSaleById').resolves(controllerMockId);
    const req = { params: { id: 1 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Act
    await salesController.getSalesById(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSaleId);
  });
  afterEach(function () {
    sinon.restore();
  });
});