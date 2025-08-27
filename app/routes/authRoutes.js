const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// EJS pages
router.get("/register", (req, res) => res.render("auth/register"));
router.get("/login", (req, res) => res.render("auth/login"));

module.exports = router;
