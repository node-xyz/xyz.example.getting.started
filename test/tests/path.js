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
  }, 'path/path.json')
})

it('wildcards - case 1 ', function (done) {
  TESTER.call({
    servicePath: 'decimal/*',
    payload: {x: 2, y: 2 },
    sendStrategy: require('xyz-core/built/Service/Middleware/service.send.to.all')
  }, (err, body, resp) => {
    expect(Object.keys(body)).to.have.lengthOf(2)
    done()
  })
})

it('wildcards - case 2 ', function (done) {
  TESTER.call({
    servicePath: '*',
    payload: {x: 2, y: 2 },
    sendStrategy: require('xyz-core/built/Service/Middleware/service.send.to.all')
  }, (err, body, resp) => {
    expect(Object.keys(body)).to.have.lengthOf(5)
    done()
  })
})

// TODO: should also add a /*/*
// but each of the functions should take the same param to have this working

after(function () {
  for (let p in processes) {
    processes[p].kill()
  }
})
