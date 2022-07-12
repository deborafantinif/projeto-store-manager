const { expect } = require('chai')
const sinon = require('sinon')
const saleModel = require('../../../models/saleModel')
const connection = require('../../../models/connection')

describe('models/saleModel', () => {
  beforeEach(sinon.restore);

  describe('create', () => {
    it('retorna o id da venda criada', async () => {
      const sales = [
        {
          "productId": 1,
          "quantity":1
        },
        {
          "productId": 2,
          "quantity":5
        }
      ]
      const saleId = { insertId: 2 }
      sinon.stub(connection, 'query').resolves([saleId])
      expect(await saleModel.create(sales)).to.be.deep.equal(saleId.insertId)
    })

    it('retorna um erro caso o MYSQL dê problema', async () => {
      sinon.stub(connection, 'query').rejects()
      try {
        await saleModel.create()
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('getAll', () => {
    it('retorna um array com todos as vendas cadastrados', async() => {
      const sales = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        },
      ]
      sinon.stub(connection, 'query').resolves([sales])
      expect(await saleModel.getAll()).to.be.deep.equal(sales)
    })

    it('retorna um erro caso o MYSQL dê problema', async () => {
      sinon.stub(connection, 'query').rejects()
      try {
        await saleModel.getAll()
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })
  
  describe('getById', () => {
    it('retorna um objeto com a venda pesquisada', async() => {
      const sale = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        },
      ]
      sinon.stub(connection, 'query').resolves([sale])
      expect(await saleModel.getById(1)).to.be.deep.equal(sale)
    })

    it('retorna um erro caso o MYSQL dê problema', async () => {
      sinon.stub(connection, 'query').rejects()
      try {
        await saleModel.getById('r')
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('update', () => {
    
  })

  describe('remove', () => {
    it('', () => {
      
    })
  })
})