const User = require("../model/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.render("users/index", { users });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "User deleted");
  res.redirect("/users");
};
