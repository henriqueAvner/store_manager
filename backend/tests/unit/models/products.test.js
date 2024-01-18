const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const {
  mockProducts, 
  mockCurrProduct,
  newProductMock,
  
  mockInsert,
} = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');

describe('Unit test - PRODUCTS MODEL:', function () {
  it('Retornando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([mockProducts]);

    const allProducts = await productsModel.findAllProducts();

    expect(allProducts).to.be.an('array');
    expect(allProducts).to.be.deep.equal(mockProducts);
  });

  it('Retornando um produto específico passando seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[mockCurrProduct]]);

    const inputDataId = 1;
    const currProduct = await productsModel.findProductById(inputDataId);

    expect(currProduct).to.be.an('object');
    expect(currProduct).to.be.deep.equal(mockCurrProduct);
  });
 
  it('Adicionando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([mockInsert]);

    const name = 'Manopla do infinito';
    const newProduct = await productsModel.insertProduct(name);

    expect(newProduct).to.be.an('object');
    expect(newProduct).to.deep.equal(newProductMock);
  });
  afterEach(function () {
    sinon.restore();
  });
});