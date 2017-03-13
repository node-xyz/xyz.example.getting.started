const SECRET = 'SHARED_SECRET'

let _authReceive = function (params, next, end) {
  let payload = params[2]
  let req = params[0]
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
