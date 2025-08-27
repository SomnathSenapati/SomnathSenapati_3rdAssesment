const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const { auth } = require("../middleware/authMiddleware");

router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.post("/", auth, upload.single("image"), createBlog);
router.post("/update/:id", auth, upload.single("image"), updateBlog);
router.post("/delete/:id", auth, deleteBlog);

// EJS Pages
router.get("/create", auth, (req, res) => res.render("blogs/create"));
router.get("/edit/:id", auth, async (req, res) => {
  const Blog = require("../models/Blog");
  const blog = await Blog.findById(req.params.id);
  res.render("blogs/edit", { blog });
});

module.exports = router;
