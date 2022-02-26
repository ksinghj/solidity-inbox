const assert = require('assert')
const ganache = require('ganache')
const Web3 = require('web3')
const { interface, bytecode } = require('../compile')

const web3 = new Web3(ganache.provider())

describe('Inbox', () => {
  let accounts
  let inbox

  beforeEach(async () => {
    // Get list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ['Hi there!'] })
      .send({ from: accounts[0], gas: '1000000' })
  })

  describe('Inbox', () => {
    it('Deploys a contract', () => {
      console.log('inbox: ', inbox)
    })
  })
})
