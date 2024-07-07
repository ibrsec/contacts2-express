const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {




  const authHeader = req.headers.authorization || req.headers.Authorization;
console.log('authHeader=', authHeader)
  let token;

  if (authHeader && authHeader.startsWith("Bearer")) {
    console.log('ife girdi');
    token = authHeader.split(" ")[1];
    console.log("token is here:", token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized - invalid token!");
      }
      req.req_user = decoded;
      req.req_access_token = token;
      console.log('token validation is ok!');
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing!");
    }
  } else {
    res.status(401);
    throw new Error("User is not authorized or token is missing!");
  }
});

module.exports = validateToken;
