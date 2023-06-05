const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/me", protect, getMe);
// router.post("/login", loginUser);
module.exports = router;
