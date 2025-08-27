const Blog = require("../model/Blog");

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({ deleted: false }).populate("author");
  res.render("blogs/index", { blogs });
};

exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author");
  res.render("blogs/show", { blog });
};

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  const blog = new Blog({
    title, 
    content,
    author: req.user.id,
    image: req.file ? "/uploads/" + req.file.filename : null,
  });
  await blog.save();
  req.flash("success_msg", "Blog created");
  res.redirect("/blogs");
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (req.user.role !== "admin" && blog.author.toString() !== req.user.id)
    return res.status(403).send("Unauthorized");
  blog.title = req.body.title;
  blog.content = req.body.content;
  if (req.file) blog.image = "/uploads/" + req.file.filename;
  await blog.save();
  req.flash("success_msg", "Blog updated");
  res.redirect("/blogs");
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (req.user.role === "admin") {
    await blog.deleteOne();
  } else if (blog.author.toString() === req.user.id) {
    blog.deleted = true;
    await blog.save();
  } else {
    return res.status(403).send("Unauthorized");
  }
  req.flash("success_msg", "Blog deleted");
  res.redirect("/blogs");
};
