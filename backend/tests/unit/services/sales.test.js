const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');
const { mockSales, mockSaleId } = require('../mocks/sales.mock');

describe('Unit tests - SERVICE SALES', function () {
  it('Retornando todos os produtos da lista', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(mockSales);
    const dateTime = '2024-01-17T21:31:44.000Z';
    const responseData = [
  
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
    const responseService = await salesServices.findSalles();
    
    expect(responseService.data).to.deep.equal(responseData);
    expect(responseService.data).to.be.an('array');
  });
  it('Retornando um produto específico da lista', async function () {
    sinon.stub(salesServices, 'findSaleById').resolves(mockSaleId);
   
    const inputData = 1;
    const responseService = await salesModel.findSaleById(inputData);
    
    expect(responseService).to.be.an('array');
    expect(responseService[0].quantity).to.deep.equal(5);
    expect(responseService[1].quantity).to.deep.equal(10);
    expect(responseService).to.have.length(2);
  });

  afterEach(function () {
    sinon.restore();
  });
});