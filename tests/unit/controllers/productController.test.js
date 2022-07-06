const { expect } = require('chai')
const sinon = require('sinon')
const productService = require('../../../services/productService')
const productController = require('../../../controllers/productController')

describe('constrollers/productController', () => {
  let req = {}
  const res = {}

  beforeEach(() => {
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns();
    sinon.restore()
  })

  describe('getAll', () => {
    it('retorna para a resposta a lista de todos os produtos', async () => {
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
      sinon.stub(productService, 'getAll').resolves(products)
      await productController.getAll(req, res)
      expect(res.json.calledWith(products)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(productService, 'getAll').rejects()
      try {
        await productController.getAll(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })
  
  describe('getById', () => {
    it('retorna para a resposta um objeto com o produto encontrado', async () => {
      const product = {
        "id": 1,
        "name": "Martelo de Thor",
      }
      const responseService = {
        code: 200,
        data: product
      }
      req = { params: { id: 1 } }
      sinon.stub(productService, 'getById').resolves(responseService)
      await productController.getById(req, res)
      expect(res.json.calledWith(product)).to.be.true
      expect(res.status.calledWith(responseService.code)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(productService, 'getById').rejects()
      try {
        await productController.getById(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('create', () => {
    it('retorna para a resposta um objeto com o produto criado', async () => {
      const product = {
        "id": 1,
        "name": "Martelo de Thor",
      }
      const responseService = {
        code: 201,
        data: product
      }
      req = { body: { name: "Martelo de Thor" } }
      sinon.stub(productService, 'create').resolves(responseService)
      await productController.create(req, res)
      expect(res.json.calledWith(product)).to.be.true
      expect(res.status.calledWith(responseService.code)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(productService, 'create').rejects()
      try {
        await productController.create(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('change', () => {
    it('retorna para a resposta um objeto com o produto atualizado', async () => {
      const product = {
        "id": 1,
        "name": "Martelo de Thor",
      }
      const responseService = {
        code: 200,
        data: product
      }
      req = { 
        body: { name: "Martelo de Thor" },
        params: { id: '1'}
      }
      sinon.stub(productService, 'change').resolves(responseService)
      await productController.change(req, res)
      expect(res.json.calledWith(product)).to.be.true
      expect(res.status.calledWith(responseService.code)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(productService, 'change').rejects()
      try {
        await productController.change(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('remove', () => {
    it('retorna para a resposta um objeto com o produto removido', async () => {
      const responseService = {
        code: 204,
        data: ''
      }
      req = { params: { id: '1'} }
      sinon.stub(productService, 'remove').resolves(responseService)
      await productController.remove(req, res)
      expect(res.json.calledWith(responseService.data)).to.be.true
      expect(res.status.calledWith(responseService.code)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(productService, 'change').rejects()
      try {
        await productController.change(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('search', () => {
    it('retorna para a resposta um objeto com o produto pesquisado', async () => {
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
      req = { query: { q: 'de'} }
      sinon.stub(productService, 'search').resolves(productsFilters)
      await productController.search(req, res)
      expect(res.json.calledWith(productsFilters)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(productService, 'search').rejects()
      try {
        await productController.search(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })
})