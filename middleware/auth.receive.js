const SECRET = 'SHARED_SECRET'

let _authReceive = function (xReceiveMessage, next, end) {
  let payload = xReceiveMessage.message
  let req = xReceiveMessage.meta.request
  let authorization = payload.authorization

  if (authorization === SECRET) {
    console.log('auth accpeted')
    next()
  } else {
    console.log('auth failed')
    // it's better to also close the request immediately
    req.destroy()
    end()
  }
}

module.exports = _authReceive
