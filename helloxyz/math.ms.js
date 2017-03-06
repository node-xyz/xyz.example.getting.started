let XYZ = require('xyz-core')

let mathMS = new XYZ({
  selfConf: {
    // will indicate the name of the sevice in logs
    name: 'math.ms',
    // default hostname
    host: '127.0.0.1'
  },
  systemConf: {
    // list of other addresses
    nodes: ['127.0.0.1:5000']
  }
})

// expose these function over the system

mathMS.register('mul', (payload, response) => {
  response.jsonify(payload.x * payload.y)
})

mathMS.register('add', (payload, response) => {
  response.jsonify(payload.x + payload.y)
})
