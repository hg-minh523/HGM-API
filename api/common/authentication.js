const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const comparePassword = async (hash,password) => {
  return bcrypt.compareSync(password, hash);
}
const verifyUser = async (token) => {
  const jwtTOken = await jwt.verify(token, 'secret',function(err,decoded){
    if(!!err){
      return false;
    }
    return decoded;
  })
  return jwtTOken
}
module.exports = {
  comparePassword,
  verifyUser
}