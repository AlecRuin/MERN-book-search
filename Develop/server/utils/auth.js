const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';


//redesigned the auth to return the user data upon verifying the user. more general purpose than using req/res/next
module.exports = {
  authMiddleware: function (token) {
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return data
    } catch {
      console.log('Invalid token');
      return false
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
