let _dummyLogger = function (params, next, end) {
  console.log('i was called! now what?')
  let port = params[3]
  let body = params[2]
  console.log(`LOGGER :: http message received on port ${port} with body ${JSON.stringify(body)}`)
  next()
}
module.exports = _dummyLogger
