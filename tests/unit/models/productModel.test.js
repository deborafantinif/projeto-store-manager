const { expect } = require('chai')
const sinon = require('sinon')
const productModel = require('../../../models/productModel')
const connection = require('../../../models/connection')

describe('models/productModel', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('retorna um array com todos os produtos cadastrados', async() => {
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
      sinon.stub(connection, 'query').resolves([products])
      expect(await productModel.getAll()).to.be.deep.equal(products)
    })

    it('retorna um erro caso o MYSQL dê problema', async () => {
      sinon.stub(connection, 'query').rejects()
      try {
        await productModel.getAll()
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })
  
  describe('getById', () => {
    it('retorna um objeto com o produto pesquisado', async() => {
      const product = {
        "id": 1,
        "name": "Martelo de Thor",
      }
      sinon.stub(connection, 'query').resolves([[product]])
      expect(await productModel.getById(1)).to.be.deep.equal(product)
    })

    it('retorna um erro caso o MYSQL dê problema', async () => {
      sinon.stub(connection, 'query').rejects()
      try {
        await productModel.getById('r')
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('create', () => {
    it('retorna o id do produto criado', async() => {
      const productId = { insertId: 2 }
      sinon.stub(connection, 'query').resolves([productId])
      expect(await productModel.create(1)).to.be.deep.equal(productId.insertId)
    })

    it('retorna um erro caso o MYSQL dê problema', async () => {
      sinon.stub(connection, 'query').rejects()
      try {
        await productModel.create()
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('update', () => {
    
  })

  describe('delete', () => {
    it('', () => {
      
    })
  })
})