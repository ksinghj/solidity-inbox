const assert = require('assert')
const ganache = require('ganache')
const Web3 = require('web3')
const { interface, bytecode } = require('../compile')

const web3 = new Web3(ganache.provider())

describe('Inbox', () => {
  let accounts
  let inbox

  const mockMessage = 'Hi there!'

  beforeEach(async () => {
    // Get list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: [mockMessage] })
      .send({ from: accounts[0], gas: '1000000' })
  })

  describe('Inbox', () => {
    it('Deploys a contract', () => {
      assert.ok(inbox.options.address)
    })

    it('Should be initialised with the correct message', async () => {
      const actualMessage = await inbox.methods.message().call()

      assert.strictEqual(actualMessage, mockMessage)
    })

    it('Should set the message', async () => {
      const testMessage = 'test message'

      await inbox.methods.setMessage(testMessage).send({ from: accounts[0] })

      const actualMessage = await inbox.methods.message().call()

      assert.strictEqual(actualMessage, testMessage)
    })
  })
})
