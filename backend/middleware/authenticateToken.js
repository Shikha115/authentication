const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token){
    return res.status(401).json({ message: "Access denied" });
  }

//   jwt.verify(token, secretOrPublicKey, [options, callback])
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err){
        return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
