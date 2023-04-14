const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
//ytd-sazt-dce

  //const token =
   // req.body.token || req.query.token || req.headers["x-access-token"];
//console.log("token : "+ token);
  if (!token) {
    return res.status(200).send({"token_required":"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(200).send({"Invalid_token":"Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;