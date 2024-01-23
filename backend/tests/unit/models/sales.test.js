const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const {
  mockSales,
  
} = require('../mocks/sales.mock');
const { salesModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');

describe(' Unit test  - SALES MODEL:', function () {
  it('Retornando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([mockSales]);

    const allSales = await salesModel.findAllSales();

    expect(allSales).to.be.an('array');
    expect(allSales).to.have.length(2);
    expect(allSales).to.be.deep.equal(mockSales);
  });

  it('Retornando um produto específico passando seu id', async function () {
    sinon.stub(connection, 'execute').resolves([mockSales]);

    const inputDataId = 2;
    const filterSales = await salesModel.findSaleById(inputDataId);

    expect(filterSales).to.be.an('array');
    expect(filterSales[0].quantity).to.deep.equal(5);
    expect(filterSales).to.be.deep.equal(mockSales);
  });
  it('Adicionando uma venda de produto', async function () {
    sinon.stub(connection, 'execute').resolves([mockSales]);
    const inputData = [
      {
        productId: 2,
        quantity: 6,
      },
    ];
    const serviceResponse = await salesModel.insertNewSale(inputData);
    
    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.itemsSold).to.be.an('array');
    expect(serviceResponse.itemsSold).to.have.length(1);
    expect(serviceResponse.itemsSold[0].quantity).to.deep.equal(6);
    expect(serviceResponse.itemsSold[0].productId).to.deep.equal(2);
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
  
  afterEach(function () {
    sinon.restore();
  });
});