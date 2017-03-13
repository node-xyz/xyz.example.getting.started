const test = require('./../common').test
const expect = require('chai').expect
const _send = test.sendMessage
const http = require('http')

let processes
let identifiers = []
let TESTER

before(function (done) {
  this.timeout(10 * 1000)
  test.setUpTestEnv((p) => {
    processes = p
    identifiers = Object.keys(processes)
    TESTER = test.getTester()
    expect(identifiers).to.have.lengthOf(2)
    setTimeout(done, 7000)
  }, 'middleware/middleware.json')
})
// if they can message with auth, we're fine

it('messaging no auth', function (done) {
  TESTER.call({servicePath: 'decimal/mul', payload: {x: 2, y: 3}},
    (err, body, resp) => {
      expect(body).to.equal(null)
      done()
    })
})

it('messaging no auth', function (done) {
  TESTER.middlewares().transport.client('CALL').register(0, require('./../../middleware/auth.send'))
  TESTER.call({servicePath: 'decimal/mul', payload: {x: 2, y: 3}},
    (err, body, resp) => {
      expect(body).to.equal(6)
      done()
    })
})

after(function () {
  for (let p in processes) {
    processes[p].kill()
  }
})
