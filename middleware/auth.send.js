const SECRET = 'SHARED_SECRET'

let _authSend = function (xSentMessageMwParam, next, end) {
  xSentMessageMwParam.requestConfig.json.authorization = SECRET
  console.log('auth header added')
  next()
}

module.exports = _authSend
