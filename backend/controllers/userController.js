const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("PLEASE ADD ALL FIELDS");
//   }

//   // Check if user exists
//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   // Hash password

//   // const salt = await BroadcastChannel.genSalt(10);
//   const salt = 12;
//   const hashedPassword = await bcrypt.hash(password, salt);

//   // Create user
//   // const user = await User.create({
//   //   name,
//   //   email,
//   //   password: hashedPassword,
//   // });

//   const user = new User({
//     name,
//     email,
//     password: hashedPassword,
//   });
//   const savedUser = await user.save();
//   // if (savedUser) {
//   //   res.status(201);
//   //   throw new Error("register successfull");
//   // }

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("invalid user data");
//   }
// };

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
};

// // generate jwt

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ mag: "enter all the fields" });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        msg: "user already exists",
      });
    }
    // Hash password

    // const salt = await BroadcastChannel.genSalt(10);
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!userExists) {
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

// const login
module.exports = {
  registerUser,
  loginUser,
};
