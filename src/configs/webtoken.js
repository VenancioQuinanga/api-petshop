const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

module.exports = app => process.env.JWT_KEY