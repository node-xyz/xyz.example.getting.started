let XYZ = require('xyz-core')
let stringMS = new XYZ({
  selfConf: {
    name: 'string.ms',
    host: '127.0.0.1',
    seed: ['127.0.0.1:4000'],
    defaultSendStrategy: require('xyz-core/src/Service/Middleware/service.send.to.all'),
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

let sendToAll = require('xyz-core/src/Service/Middleware/service.send.to.all')
let firstFind = require('xyz-core/src/Service/Middleware/service.first.find')
setInterval(() => {
  stringMS.call({servicePath: 'mul', payload: {x: 2, y: 5}, sendStrategy: sendToAll}, (err, body, res) => {
    console.log(`response of mul => ${JSON.stringify(body)} [err ${err}]`)
  })

  stringMS.call({servicePath: 'mul', payload: {x: 2, y: 5}, sendStrategy: firstFind}, (err, body, res) => {
    console.log(`response of mul => ${JSON.stringify(body)} [err ${err}]`)
  })
}, 1000)
