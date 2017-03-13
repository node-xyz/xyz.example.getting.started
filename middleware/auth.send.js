const SECRET = 'SHARED_SECRET'

let _authSend = function (params, next, end) {
  // params[0] is the requestConfig
  params[0].json.authorization = SECRET
  console.log('auth header added')
  next()
}

module.exports = _authSend
