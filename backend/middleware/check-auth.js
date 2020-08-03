const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { //typical middleware of typescript
  try {
    const token = req.heders.authorization.split(' ')[1];
    jwt.verify(token, 'secret_this_should_be_longer'); //Check whether if it getting the correct token from the server created it
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth failed!'});
  }


};
