const test = require('./../common').test
const expect = require('chai').expect
const _send = test.sendMessage
const http = require('http')

let processes
let identifiers = []
let TESTER

before(function (done) {
  test.setUpTestEnv((p) => {
    processes = p
    identifiers = Object.keys(processes)
    TESTER = test.getTester()
    expect(identifiers).to.have.lengthOf(2)
    done()
  }, 'helloxyz/helloxyz.json')
})

it('message rate', function (done) {
  this.timeout(5000)
  setTimeout(() => {
    _send('network', processes['math.ms@127.0.0.1:4000'], (data) => {
      console.log(data)
      expect(data.rcv).to.be.above(0.5)
      done()
    })
  }, 2000)
})
it('messaging', function (done) {
  // this is because it takes time for the TESTER node to identify string and math
  this.timeout(20 * 1000)
  setTimeout(() => {
    TESTER.call({servicePath: 'mul', payload: {x: 2, y: 3}},
    (err, body, resp) => {
      expect(body).to.equal(6)
      done()
    })
  }, 6 * 1000)
})

after(function () {
  for (let p in processes) {
    processes[p].kill()
  }
})
