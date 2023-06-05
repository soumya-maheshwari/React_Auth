const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token

      token = req.headers.authorization.split("")[1];

      // verift token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // GET USER FROM TOKEN
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorized , no token ");
  }
};

module.exports = { protect };
