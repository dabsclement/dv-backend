const Blog = require("../models/blog");

exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);

    await blog.save();
    res.status(200).json({ blog });
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
        limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit
      };
    }
    results.results = await Blog.find().limit(limit).skip(startIndex).exec();
    const paginatedResults = results;
    const totalPage = Math.round(podcastList.length / limit);
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