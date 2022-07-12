const { expect } = require('chai')
const sinon = require('sinon')
const saleService = require('../../../services/saleService')
const saleController = require('../../../controllers/saleController')

describe('constrollers/saleController', () => {
  let req = {}
  const res = {}

  beforeEach(() => {
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns();
    sinon.restore()
  })

  describe('create', () => {
    it('retorna para a resposta um objeto com a venda criada', async () => {
      const responseService = {
        code: 201,
        data: {
          "id": 3,
          "itemsSold": [
            {
              "productId": 1,
              "quantity":1
            },
            {
              "productId": 2,
              "quantity":5
            }
          ]
        }
      }
      req = { 
        body: [
          {
            "productId": 1,
            "quantity":1
          },
          {
            "productId": 2,
            "quantity":5
          }
        ]
      }
      sinon.stub(saleService, 'create').resolves(responseService)
      await saleController.create(req, res)
      expect(res.json.calledWith(responseService.data)).to.be.true
      expect(res.status.calledWith(responseService.code)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(saleService, 'create').rejects()
      try {
        await saleController.create(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('getAll', () => {
    it('retorna para a resposta a lista de todas as vendas', async () => {
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
      sinon.stub(saleService, 'getAll').resolves(sales)
      await saleController.getAll(req, res)
      expect(res.json.calledWith(sales)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(saleService, 'getAll').rejects()
      try {
        await saleController.getAll(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })
  
  describe('getById', () => {
    it('retorna para a resposta um objeto com a venda encontrada', async () => {
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
        }
      ]
      const responseService = {
        code: 200,
        data: sale
      }
      req = { params: { id: 1 } }
      sinon.stub(saleService, 'getById').resolves(responseService)
      await saleController.getById(req, res)
      expect(res.json.calledWith(sale)).to.be.true
      expect(res.status.calledWith(responseService.code)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(saleService, 'getById').rejects()
      try {
        await saleController.getById(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('update', () => {
    it('retorna para a resposta um objeto com a venda atualizada', async () => {
      const sale = {
        "saleId": 1,
        "itemsUpdated": [
          {
            "productId": 1,
            "quantity":10
          },
          {
            "productId": 2,
            "quantity":50
          }
        ]
      }
      const responseService = {
        code: 200,
        data: sale
      }
      req = { 
        body: [
          {
            "productId": 1,
            "quantity":10
          },
          {
            "productId": 2,
            "quantity":50
          }
        ],
        params: { id: '1'}
      }
      sinon.stub(saleService, 'update').resolves(responseService)
      await saleController.update(req, res)
      expect(res.json.calledWith(sale)).to.be.true
      expect(res.status.calledWith(responseService.code)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(saleService, 'update').rejects()
      try {
        await saleController.change(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })

  describe('remove', () => {
    it('retorna para a resposta um objeto com a venda removida', async () => {
      const responseService = {
        code: 204,
        data: ''
      }
      req = { params: { id: '1'} }
      sinon.stub(saleService, 'remove').resolves(responseService)
      await saleController.remove(req, res)
      expect(res.json.calledWith(responseService.data)).to.be.true
      expect(res.status.calledWith(responseService.code)).to.be.true
    })

    it('retorna erro caso dê problema no service', async () => {
      sinon.stub(saleService, 'remove').rejects()
      try {
        await saleController.change(req, res)
      } catch (err) {
        expect(err).to.be.instanceOf(Error)
      }
    })
  })
})