const { expect } = require('chai')
const sinon = require('sinon')
const saleService = require('../../../services/saleService')
const saleModel = require('../../../models/saleModel')
// const validate = require('../../../validations/validationStructure');

describe('services/saleService', () => {
  beforeEach(sinon.restore)

  describe('create', () => {
  // it('retorna um objeto com a venda criada', async () => {
  //   const response = {
  //     code: 201,
  //     data: {
  //       id: 2,
  //       name: 'caneca'
  //     }
  //   }
  //   const validation = { validationStructure: validate.validationStructure }
  //   sinon.stub(productModel, 'create').resolves(2)
  //   sinon.stub( validation, 'validationStructure').resolves(null)
  //   expect(await productService.getById(1)).to.be.deep.equal(response)
  // })

  // it('retorna um response de erro caso o Model não encontre o produto', async () => {
  //   const response = {
  //     code: 404,
  //     data: {
  //       message: 'Product not found'
  //     }
  //   }
  //   sinon.stub(productModel, 'getById').resolves(null)
  //   expect(await productService.getById(500)).to.be.deep.equal(response)
  // })
})

  describe('getAll', () => {
    it('retorna um array com todos as vendas cadastradas', async () => {
      const sales = [ teste, test2 ]
      sinon.stub( saleModel, 'getAll').resolves(sales)
      expect(await saleService.getAll()).to.be.deep.equal(sales)
    })

    it('retorna um erro caso o Model dê problema', async () => {
      sinon.stub(saleModel, 'getAll').rejects()
      try {
        await saleService.getAll()
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })
  
  describe('getById', () => {
    it('retorna um objeto com a venda selecionada', async () => {
      const sale = {
        "id": 1,
        "name": "teste",
      }
      const response = {
        code: 200,
        data: sale
      }
      sinon.stub( saleModel, 'getById').resolves(sale)
      expect(await saleService.getById(1)).to.be.deep.equal(response)
    })

    it('retorna um response de erro caso o Model não encontre a venda', async () => {
      const response = {
        code: 404,
        data: {
          message: 'Sale not found'
        }
      }
      sinon.stub(saleModel, 'getById').resolves(null)
      expect(await saleService.getById(500)).to.be.deep.equal(response)
    })
  })
  
  describe('change', () => {
    // it('retorna um objeto com o produto atualizado', async () => {
    //   const product = {
    //     "id": 1,
    //     "name": "Martelo de Thor",
    //   }
    //   const response = {
    //     code: 200,
    //     data: product
    //   }
    //   const validation = { validationStructure }
    //   sinon.stub( validate, 'validationStructure').resolves(null)
    //   sinon.stub( productModel, 'getById').resolves(product)
    //   sinon.stub( productModel, 'change').resolves(null)
    //   expect(await productService.change(product.name, product.id)).to.be.deep.equal(response)
    // })

    // it('retorna um response de erro caso o envio do corpo da requisição esteja errado', async () => {
    //   const errorValidation = {
    //     code: 422,
    //     message: 'value is required'
    //   }
    //   const response = {
    //     code: errorValidation.code,
    //     data: errorValidation.message
    //   }
    //   sinon.stub( validate, 'validationStructure').resolves(errorValidation)
    //   expect(await productService.change()).to.be.deep.equal(response)
    // })
  })

  describe('remove', () => {
    it('retorna o statusCode 204 quando a venda for removida com sucesso', async () => {
      const sale = [{
        "id": 1,
        "name": "teste",
      }]
      const response = {
        code: 204,
        data: ''
      }
      sinon.stub( saleModel, 'getById').resolves(sale)
      sinon.stub( saleModel, 'remove').resolves(response)
      expect(await saleService.remove(1)).to.be.deep.equal(response)
    })

    it('retorna um response de erro caso o Model não encontre a venda', async () => {
      const response = {
        code: 404,
        data: {
          message: 'Sale not found'
        }
      }
      sinon.stub(saleModel, 'getById').resolves(null)
      expect(await saleService.getById(500)).to.be.deep.equal(response)
    })
  })
})