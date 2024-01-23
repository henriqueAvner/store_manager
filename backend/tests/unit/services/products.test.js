const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');
const { mockProducts,
  mockCurrProduct, 
  newProductMock } = require('../mocks/products.mock');
const { validNewProduct } = require('../../../src/middlewares/validateNewProducts.middleware');

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
  it('Validando os campos de produtos da lista', async function () {
    const error = '"name" is required';
    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await validNewProduct(req, res, next);
    
    expect(next).not.to.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: error });
  });
  it('Validando se o campo name possui pelo menos 5 caracteres', async function () {
    const error = '"name" length must be at least 5 characters long';
    const req = { body: { name: 'alo' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await validNewProduct(req, res, next);
    
    expect(next).not.to.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: error });
  });
  it('Ao validar o campo de maneira correta, o cadastro é realizado', async function () {
    const req = { body: { name: 'Avner' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await validNewProduct(req, res, next);
    
    expect(next).to.have.been.calledWith();
    expect(res.status).not.to.have.been.calledWith();
    expect(res.json).not.to.have.been.calledWith();
  });
  it('Testando se, ao digitar um id desconhecido, o produto não é encontrado', async function () {
    sinon.stub(productsModel, 'deleteProductModel').resolves([]);

    const inputData = 4545;

    const responseService = await productsServices.deleteProductService(inputData);
    expect(responseService.status).to.deep.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });
  it('Testando se um produto é deletado com sucesso', async function () {
    sinon.stub(productsModel, 'deleteProductModel').resolves([{}]);
    const inputData = 1;
    
    const responseService = await productsServices.deleteProductService(inputData);
    
    expect(responseService.status).to.deep.equal('NO_CONTENT');
    expect(responseService.data).to.deep.equal({});
  });

  it('Testando a função procurar um produtos, com sucesso.', async function () {
    sinon.stub(productsModel, 'findQProducts').resolves([{ 
      id: 1, name: 'Bat-Leite', 
    }]);

    const searchTerm = 'martelo';

    const response = await productsServices.findQueryProducts(searchTerm);

    expect(response.status).to.equal('SUCCESS');
    expect(response.data).to.deep.equal([{ 
      id: 1, name: 'Bat-Leite', 
    }]);
  });

  afterEach(function () {
    sinon.restore();
  });
});