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
  
  it('Alterando um produto da tabela de id 2', async function () {
    sinon.stub(connection, 'execute').resolves([mockCurrProduct]);

    const updateProduct = await productsModel.updateProductModel(2, 'Capa do superman');
    expect(updateProduct).to.be.an('object');
    expect(updateProduct.id).to.be.an('number');
    expect(updateProduct.name).not.to.deep.equal('Capa de invisibilidade');
    expect(updateProduct).to.be.deep.equal({ id: 2, name: 'Capa do superman' });
  });

  it('Realizando teste na função procurar um Produto', async function () {
    sinon.stub(connection, 'execute').resolves([{
      id: 1,
      name: 'Martelo de Thor',
    }]);

    const searchTerm = 'martelo';

    const response = await productsModel.findQProducts(searchTerm);

    expect(response).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
