const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const signIn = (inforUser) => {
  const token = jwt.sign(inforUser, process.env.PRIVATEKEY,  { expiresIn: '24h' }, function(err, token) {
    if(err) {
      throw new Error;
    }
  });
  if (!!token ) {
    const password = inforUser.password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds,async function(err, hash) {
      if (err) {
        throw new Error;
      }
      return hash
  });
  }
}


const login = async (password,hash) => {
 return await bcrypt.compare(password, hash);
}
const verify = async () => {

}
module.exports = {
  signIn,
  login,
  verify
}