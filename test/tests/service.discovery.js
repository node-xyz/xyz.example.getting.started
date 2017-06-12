const test = require('./../common').test
const expect = require('chai').expect
const _send = test.sendMessage
const http = require('http')

let processes
let identifiers = []
let TESTER

before(function (done) {
  this.timeout(5000)
  test.setUpTestEnv((p) => {
    processes = p
    identifiers = Object.keys(processes)
    TESTER = test.getTester()
    setTimeout(() => {
      expect(identifiers).to.have.lengthOf(7)
      done()
    })
  }, 'service-discovery/service.discovery.json')
})

it('message rate', function (done) {
  this.timeout(10 * 1000)
  setTimeout(() => {
    _send('network', processes['math.ms@127.0.0.1:4000'], (data) => {
      console.log(data)
      expect(data.rcv).to.be.above(1)
      done()
    })
  }, 8000)
})
it('messaging', function (done) {
  // this is because it takes time for the TESTER node to identify string and math
  this.timeout(6000)
  setTimeout(() => {
    _send('inspectJSON', processes['math.ms@127.0.0.1:4000'], (data) => {
      expect(data.global.systemConf.nodes).to.have.lengthOf(7 + 1)
      done()
    })
  }, 5000)
})

after(function () {
  for (let p in processes) {
    processes[p].kill()
  }
})
