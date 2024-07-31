const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/user");
const authenticateToken = require("../middleware/authenticateToken");

router.route("/register").post(async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, password: hashPassword });
    console.log("User Registered = " + username + "-" + password);
    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(400)
        .json({ status: "error", message: "Invalid username or password" });
    }
    // jwt.sign(payload, secretOrPrivateKey, [options, callback]) = (data,key,option)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ status: "success", data: user, token: token });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

router.get("/protected", authenticateToken, (req, res) => {
  res.send("This is a protected route: " + req.user);
});

module.exports = router;
