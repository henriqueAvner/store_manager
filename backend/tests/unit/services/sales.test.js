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

  it('Testando a função delete de uma venda com sucesso.', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves([]);
    sinon.stub(salesModel, 'findSaleById').resolves([]);

    const id = 1;

    const response = await salesServices.deleteSale(id);

    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Sale not found' });
  });

  it('Testando a função de validação de uma venda com o id inexistente.', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves([]);

    sinon.stub(salesModel, 'findSaleById').resolves([undefined]);

    const id = 4;

    const response = await salesServices.deleteSale(id);

    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.deep.equal({ message: 'Sale not found' });
  });
  it('Deletando uma venda com sucesso', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves([{}]);
    sinon.stub(salesModel, 'deleteSale').resolves();
  
    const id = 1;
    const { status, data } = await salesServices.deleteSale(id);
  
    expect(status).to.be.equal('NO_CONTENT');
    expect(data).to.be.deep.equal({});
  });
  it('Deletar uma sale que nao existe', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves([]);
    sinon.stub(salesModel, 'deleteSale').resolves();

    const id = 44;
    const { status, data } = await salesServices.deleteSale(id);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Testando a função de atualiza a quantidade de um produto em uma venda com sucesso.', async function () {
    sinon.stub(salesModel, 'selectQuantitySale').resolves({
      date: '2024-01-23T15:32:23.000Z',
      productId: 2,
      quantity: 10,
      saleId: 1,
    });
    const saleId = 1;
    const productId = 2;
    const quantity = 1;
  
    const response = await salesServices.updateQuantity(saleId, productId, quantity);
    expect(response.status).to.equal('SUCCESS'); 
    expect(response.data).to.be.deep.equal({
      date: '2024-01-23T15:32:23.000Z',
      productId: 2,
      quantity: 10,
      saleId: 1,
    });
  });

  it('Testando a função de atualiza a quantidade de um produto em uma venda, sem passar quantidade no corpo da requisição.', async function () {
    sinon.stub(salesModel, 'updateQuantitySale').resolves();
    const saleId = 1;
    const productId = 2;
    const quantity = null;    
    sinon.stub(salesModel, 'selectQuantitySale').resolves({
      status: 'BAD_REQUEST',
      message: '"quantity" is required',
    });
    const response = await salesServices.updateQuantity(saleId, productId, quantity);

    expect(response.data).to.be.deep.equal({ 
      status: 'BAD_REQUEST',
      message: '"quantity" is required',
    });
  });

  it('Testando a função de validação de update/atualização', async function () {
    sinon.stub(salesModel, 'updateQuantitySale').resolves([]);
    sinon.stub(salesModel, 'selectQuantitySale').resolves([]);

    const responseSale = await salesServices.updateQuantity(54, 85, -3);

    const responseProduct = await salesServices.updateQuantity(1, 85, -3);
 
    const responseProductInSale = await salesServices.updateQuantity(1, 1, 1);
   
    expect(responseSale.status).to.deep.equal('NOT_FOUND');
    expect(responseSale.data).to.deep.equal({ message: 'Sale not found' });
    expect(responseSale.status).to.deep.equal('NOT_FOUND');
    expect(responseProduct.data).to.deep.equal({ message: 'Product not found in sale' });
    expect(responseProductInSale.status).to.deep.equal('SUCCESS');
    expect(responseProductInSale.data).to.deep.equal([]);
  });

  afterEach(function () {
    sinon.restore();
  });
});
