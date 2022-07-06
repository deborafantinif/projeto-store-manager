const { expect } = require('chai')
const sinon = require('sinon')
const productService = require('../../../services/productService')
const productModel = require('../../../models/productModel')
const validate = require('../../../validations/validationStructure');

describe('services/productService', () => {
  beforeEach(sinon.restore)

  describe('getAll', () => {
    it('retorna um array com todos os produtos cadastrados', async () => {
      const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
    ]
      sinon.stub( productModel, 'getAll').resolves(products)
      expect(await productService.getAll()).to.be.deep.equal(products)
    })

    it('retorna um erro caso o Model dê problema', async () => {
      sinon.stub(productModel, 'getAll').rejects()
      try {
        await productService.getAll()
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })
  
  describe('getById', () => {
    it('retorna um objeto com o produto selecionado', async () => {
      const product = {
        "id": 1,
        "name": "Martelo de Thor",
      }
      const response = {
        code: 200,
        data: product
      }
      sinon.stub( productModel, 'getById').resolves(product)
      expect(await productService.getById(1)).to.be.deep.equal(response)
    })

    it('retorna um response de erro caso o Model não encontre o produto', async () => {
      const response = {
        code: 404,
        data: {
          message: 'Product not found'
        }
      }
      sinon.stub(productModel, 'getById').resolves(null)
      expect(await productService.getById(500)).to.be.deep.equal(response)
    })
  })

  describe('create', () => {
    // it('retorna um objeto com o produto criado', async () => {
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
    it('retorna o statusCode 204 quando o produto for removido com sucesso', async () => {
      const product = {
        "id": 1,
        "name": "Martelo de Thor",
      }
      const response = {
        code: 204,
        data: ''
      }
      sinon.stub( productModel, 'getById').resolves(product)
      expect(await productService.remove(1)).to.be.deep.equal(response)
    })

    it('retorna um response de erro caso o Model não encontre o produto', async () => {
      const response = {
        code: 404,
        data: {
          message: 'Product not found'
        }
      }
      sinon.stub(productModel, 'getById').resolves(null)
      expect(await productService.getById(500)).to.be.deep.equal(response)
    })
  })

  describe('search', () => {
    it('retorna uma lista com todos os produtos correspondentes à pesquisa', async () => {
      const allProducts = [
        {
        "id": 1,
        "name": "Martelo de Thor",
        },
        {
        "id": 2,
        "name": "Pedro de Thor",
        },
        {
        "id": 3,
        "name": "Thor",
        }
      ]
      const productsFilters = [
        {
        "id": 1,
        "name": "Martelo de Thor",
        },
        {
        "id": 2,
        "name": "Pedro de Thor",
        }
      ]
      sinon.stub( productModel, 'getAll').resolves(allProducts)
      expect(await productService.search('de')).to.be.deep.equal(productsFilters)
    })

    it('retorna uma lista com todos os produtos se "name" estiver vazio', async () => {
            const allProducts = [
        {
        "id": 1,
        "name": "Martelo de Thor",
        },
        {
        "id": 2,
        "name": "Pedro de Thor",
        },
        {
        "id": 3,
        "name": "Thor",
        }
      ]
      sinon.stub( productModel, 'getAll').resolves(allProducts)
      expect(await productService.search('')).to.be.deep.equal(allProducts)
    })
  })
})