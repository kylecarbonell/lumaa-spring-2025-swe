const jwt = require("jsonwebtoken");

export function generateToken(id: string) {
  var privateKey = process.env.PRIVATE_KEY;
  var token = jwt.sign({ id: id }, privateKey, { expiresIn: 60 * 60 * 24 * 5 }); // 5 Day expiration

  return token;
}
