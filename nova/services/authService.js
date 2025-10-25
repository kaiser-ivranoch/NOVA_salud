const UserAuth = require('../models/authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthService {
  async register(data) {
    data.password = bcrypt.hashSync(data.password, 10)
    const userAuth = new UserAuth(data)
    return await userAuth.save()
  }

  async filterByEmail(email) {
    return await UserAuth.findOne({ email })
  }

  generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
  }
}

module.exports = AuthService