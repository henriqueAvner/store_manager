const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');
const { mockSales, mockSaleId, saleWithoutQuantity, saleWithoutProductId, quantityWithoutValue, fullSale, fullSaleWithoutQuantity, correctSale } = require('../mocks/sales.mock');
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
    sinon.stub(salesModel, 'findSaleById').resolves(mockSaleId);
   
    const inputData = 1;
    const responseService = await salesServices.findSaleById(inputData);
    
    expect(responseService).to.be.an('object');
    
    expect(responseService.status).to.deep.equal('SUCCESS');
    expect(responseService.data[0].quantity).to.deep.equal(5);
    expect(responseService.data[0].productId).to.deep.equal(1);
    expect(responseService.data[0].date).to.deep.equal('2024-01-18T02:35:00.000Z');
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
  it('Não é possível realizar uma venda com o campo "productId" inexistente', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(null);
    sinon.stub(salesModel, 'insertNewSale').resolves(fullSale);

    const responseService = await salesServices.insertSale(fullSale.itemsSold);

    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });
  it('Não é possível realizar uma venda com o campo "quantity" inexistente', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(null);
    sinon.stub(salesModel, 'insertNewSale').resolves(fullSaleWithoutQuantity);

    const responseService = await salesServices.insertSale(fullSaleWithoutQuantity.itemsSold);

    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });
  it('É possível realizar uma venda com sucesso', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(correctSale);
    sinon.stub(salesModel, 'insertNewSale').resolves(correctSale);

    const responseService = await salesServices.insertSale(correctSale.itemsSold);

    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal('CREATED');
    expect(responseService.data.itemsSold).to.be.an('array');
    expect(responseService.data.itemsSold[0]).to.deep.equal({ productId: 3, quantity: 1 });
  });

  afterEach(function () {
    sinon.restore();
  });
});
