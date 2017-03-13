let XYZ = require('xyz-core')

let mathMS = new XYZ({
  selfConf: {
    name: 'math.ms',
    host: '127.0.0.1'
  },
  systemConf: {nodes: []}
})

let _dummyLogger = require('./dummy.logger')
mathMS.middlewares().transport.server('CALL')(4000).register(0, _dummyLogger)

let _authSend = require('./auth.send')
let _authReceive = require('./auth.receive')
mathMS.middlewares().transport.server('CALL')(4000).register(1, _authReceive)
mathMS.middlewares().transport.client('CALL').register(0, _authSend)

mathMS.register('decimal/mul', (payload, response) => {
  console.log('decimal/mul was called!')
  response.jsonify(payload.x * payload.y)
})

mathMS.register('decimal/add', (payload, response) => {
  response.jsonify(payload.x + payload.y)
})

mathMS.register('float/mul', (payload, response) => {
  // let's add the float casting, just fore sake of our example!
  response.jsonify(parseFloat(payload.x * payload.y))
})

mathMS.register('float/add', (payload, response) => {
  response.jsonify(parseFloat(payload.x + payload.y))
})

console.log(mathMS)
