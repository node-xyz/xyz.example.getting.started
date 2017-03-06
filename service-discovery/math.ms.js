let XYZ = require('xyz-core')

let mathMS = new XYZ({
  selfConf: {
    name: 'math.ms',
    host: '127.0.0.1'
  },
  systemConf: {nodes: []}
})

mathMS.register('mul', (payload, response) => {
  response.jsonify(payload.x * payload.y)
})

mathMS.register('add', (payload, response) => {
  response.jsonify(payload.x + payload.y)
})
