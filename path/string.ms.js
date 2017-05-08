let XYZ = require('xyz-core')
let sendToAll = require('xyz-core/built/Service/Middleware/service.send.to.all')
let firstFind = require('xyz-core/built/Service/Middleware/service.first.find')

let stringMS = new XYZ({
  selfConf: {
    name: 'string.ms',
    host: '127.0.0.1',
    seed: ['127.0.0.1:4000'],
    transport: [{type: 'HTTP', port: 5000}]
  },
  systemConf: {nodes: []}
})
stringMS.register('up', (payload, response) => {
  response.jsonify(payload.toUpperCase())
})
stringMS.register('down', (payload, response) => {
  response.jsonify(payload.toLowerCase())
})

setInterval(() => {
  stringMS.call({
    servicePath: '/decimal/mul',
    payload: {x: 2, y: 5},
    sendStrategy: firstFind
  },
  (err, body, res) => {
    console.log(`/decimal/mul [firstFind] => ${body} [err ${err}]`)
  })

  stringMS.call({
    servicePath: '/decimal/*',
    payload: {x: 2, y: 5},
    sendStrategy: sendToAll
  },
  (err, body, res) => {
    console.log(`/decimal/* [sendToAll]=> ${JSON.stringify(body)} [err ${err}]`)
  })
}, 1000)
