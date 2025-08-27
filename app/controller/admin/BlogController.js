// const ErrorCode = require("../../helper/httpsServerCode");
const blogModel = require("../../model/admin/blog");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
class BlogController {
  async add(req, res) {
    console.log(req.body);
    // console.log(req.file);

    try {
      //console.log(req.body);
      const { title, description, icon } = req.body;

      const sdata = new blogModel({
        title,
        description,
        icon,
      });
      const data = await sdata.save();
      if (data) {
        res.redirect("/blog/list");
      } else {
        res.redirect("/add");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async List(req, res) {
    try {
      const data = await blogModel.find();
      res.render("blog/list", {
        title: "blog List",
        data: data,
      });
    } catch (error) {
      res.redirect("/blog/list", { message: error.message });
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const editdata = await blogModel.findById(id);
      res.render("blog/edit", {
        title: "edit page",
        data: editdata,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      // Fetch the existing blog document
      const existingblog = await blogModel.findById(id);
      if (!existingblog) {
        return res.status(404).json({
          status: false,
          message: "blog not found",
        });
      }

      let updateData = { ...req.body };

      // If a new image is uploaded
      if (req.file) {
        // Delete the old image file if it exists
        if (existingblog.image) {
          const oldImagePath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            existingblog.image
          );
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Error deleting old image:", err);
            } else {
              console.log("Old image deleted successfully.");
            }
          });
        }

        // Update the image path in the update data
        updateData.image = req.file.path;
        console.log("New image uploaded and path added:", req.file.path);
      }

      // Update the blog document
      const updatedblog = await blogModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

      if (!updatedblog) {
        return res.status(404).json({
          status: false,
          message: "blog not found",
        });
      }

      res.redirect("/blog/list");
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedData = await blogModel.findByIdAndDelete(id);

      if (!deletedData) {
        return res.status(404).json({
          status: false,
          message: "blog not found",
        });
      }

      res.redirect("/blog/list");
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  }
}
module.exports = new BlogController();
