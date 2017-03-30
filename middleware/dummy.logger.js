let _dummyLogger = function (xReceiveMessage, next, end) {
  console.log('i was called! now what?')
  console.log(`LOGGER :: http message received on port ${xReceiveMessage.serverId.port} with body ${JSON.stringify(xReceiveMessage.message)}`)
  next()
}
module.exports = _dummyLogger
