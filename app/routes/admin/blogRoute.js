const express = require("express");
const BlogController = require("../../controller/blogController");
const router = express.Router();

router.get("/list", BlogController.getAllBlogs);
router.get("/add", (req, res) => {
  try {
    res.render("blog/add", {
      title: "blogs Add",
    });
  } catch (error) {
    res.redirect("/services/add");
  }
});

router.post("/add", BlogController.createBlog);
router.get("/edit/:id", BlogController.getBlog);
router.post("/update/:id", BlogController.updateBlog);
router.get("/delete/:id", BlogController.deleteBlog);

module.exports = router;
