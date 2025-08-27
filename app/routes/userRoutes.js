const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../controller/userController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.get("/", auth, isAdmin, getAllUsers);
router.delete("/:id", auth, isAdmin, deleteUser);

module.exports = router;
