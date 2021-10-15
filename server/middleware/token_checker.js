const { verify } = require("../utils/jwt");

module.exports = async function (req, res, next) {
  const token = req.cookies.token;

  if (token) {
    const user = await verify(token);

    req.user = user;
  }

  next();
};
