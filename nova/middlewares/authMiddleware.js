const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const token = req.cookies.token
  if (!token) return res.redirect('/auth/login')

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    res.clearCookie('token')
    return res.redirect('/auth/login')
  }
}

module.exports = verifyToken