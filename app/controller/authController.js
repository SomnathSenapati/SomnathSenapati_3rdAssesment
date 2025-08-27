const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    req.flash("success_msg", "Registration successful");
    res.redirect("/login");
  } catch (err) {
    req.flash("error_msg", "Error: " + err.message);
    res.redirect("/register");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    req.flash("error_msg", "Invalid credentials");
    return res.redirect("/login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    req.flash("error_msg", "Invalid credentials");
    return res.redirect("/login");
  }
  const token = jwt.sign({ id: user._id, role: user.role }, "jwtsecret");
  req.session.token = token;
  req.flash("success_msg", "Logged in successfully");
  res.redirect("/dashboard");
};

exports.logout = (req, res) => {
  req.session.destroy();
  req.flash("success_msg", "Logged out");
  res.redirect("/login");
};
