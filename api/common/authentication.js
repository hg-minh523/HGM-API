const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const comparePassword = async (hash,password) => {
  return bcrypt.compareSync(password, hash);
}
const verifyUser = async (token) => {
  const decoded = jwt.verify(token.split(' ')[1], 'secret')
  return decoded
}
module.exports = {
  comparePassword,
  verifyUser
}