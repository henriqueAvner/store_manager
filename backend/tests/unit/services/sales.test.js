const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');
const { mockSales, mockSaleId, saleWithoutQuantity, saleWithoutProductId, quantityWithoutValue, fullSale } = require('../mocks/sales.mock');
const { validateQuantity, validateProductId, validateQuantityLength } = require('../../../src/middlewares/validateSale.middleware');

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

  it('Não é possível realizar uma venda com o campo "quantity" vazio', async function () {
    const error = '"quantity" is required';
    const req = { body: saleWithoutQuantity };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    validateQuantity(req, res, next);

    expect(next).to.not.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: error });
  });
  it('Não é possível realizar uma venda com o campo "productId" vazio', async function () {
    const error = '"productId" is required';
    const req = { body: saleWithoutProductId };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    validateProductId(req, res, next);

    expect(next).to.not.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: error });
  });
  it('Não é possível realizar uma venda com o campo "quantity" igual a 0', async function () {
    const error = '"quantity" must be greater than or equal to 1';
    const req = { body: quantityWithoutValue };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    validateQuantityLength(req, res, next);

    expect(next).to.not.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: error });
  });
  it('Não é possível realizar uma venda única com o campo "productId" inexistente', async function () {
    sinon.stub(salesModel, 'insertNewSale').resolves(fullSale);
    const responseData = {
      itemsSold: [
        {
          quantity: 1,
        },
      ],
    };
    const responseService = await salesServices.insertSale(responseData);

    expect(responseService).to.be.an('object');
   
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
