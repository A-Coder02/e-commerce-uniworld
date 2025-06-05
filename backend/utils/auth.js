const jwt = require("jsonwebtoken");

// Generate Access
const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return { accessToken };
};

// Verify Token
const verifyToken = (token, type) => {
  const expiration =
    type === "access"
      ? process.env.JWT_EXPIRATION
      : process.env.REFRESH_EXPIRATION;
  return jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
};

module.exports = { generateTokens, verifyToken };
