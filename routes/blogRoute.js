var express = require("express");
var router = express.Router();
const { createBlog, getBlogs, deleteBlog, blogList, updateBlog } = require("../controllers/blogController");

router.post("/addblog", createBlog);
router.get("/getblogs", getBlogs);
router.delete("/deleteblog/:id", deleteBlog);
router.get("/blogbypage", blogList);
router.patch("/editblog/:id", updateBlog);

module.exports = router;
