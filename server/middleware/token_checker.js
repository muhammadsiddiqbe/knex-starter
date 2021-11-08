const { verify } = require("../utils/jwt");
const { User } = require("../modules/collector");

module.exports = async function (req, __, next) {
  const token = req.cookies.token;

  if (token) {
    const user = await verify(token);

    if (await User.findOne({ id: user.id })) req.user = user;
  }

  next();
};
