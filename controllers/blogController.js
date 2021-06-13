const { imageUploader } = require("../config/cloudinary");
const { Blog, validate } = require("../models/blog");

exports.createBlog = async (req, res) => {
  try {
    if (!req.file) {
      throw Error("image not found");
    }
    console.log(req.file);
    const { path } = req.file;
    const image = await imageUploader(path);
    console.log(image);
    const imageData = {
      image: image.imageUrl,
      imageId: image.publicId,
    };
    const payload = Object.assign(req.body, imageData);
    const { error } = validate(payload);
    if (error) return res.status(400).send(error.details[0].message);
    // const image = imageUploader(path);
    // const imageData = {
    //   image: image.imageUrl,
    //   imageId: image.publicId,
    // };
    // const payload = Object.assign(req.body, imageData);
    let blog = new Blog(payload);
    blog = await blog.save();

    return res.send(blog);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getBlogs = async (req, res) => {
  try {
    // fetch all blogs
    const blogs = await Blog.find({});
    return res.status(200).json({ blogs });
  } catch (err) {
    res.status(500).send(err);
  }
};
// get blogs by page
exports.blogList = async (req, res) => {
  try {
    const blogList = await Blog.find();
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < blogList.length) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }
    results.results = await Blog.find().limit(limit).skip(startIndex).exec();
    const paginatedResults = results;
    const totalPage = Math.round(blogList.length / limit);
    return res.status(200).json({ result: paginatedResults, totalPage });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) res.status(404).send("No podcast found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    await blog.save();
    res.send(blog);
  } catch (err) {
    res.status(500).send(err);
  }
};
