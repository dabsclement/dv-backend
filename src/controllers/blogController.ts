import { Request, Response, NextFunction } from "express";
import Blog from "@models/blog";
import { validateBlog } from "@helpers/validate";

export const createBlog = async (req: Request, res: Response) => {
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let blog = new Blog(req.body);
    blog = await blog.save();

    return res.send({ status: 201, data: blog });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getBlogs = async (_req: Request, res: Response) => {
  try {
    // fetch all blogs
    const blogs = await Blog.find({});
    return res.status(200).json({ blogs });
  } catch (err) {
    return res.status(500).send(err);
  }
};
// get blogs by page
export const blogList = async (req: Request, res: Response) => {
  try {
    const blogList = await Blog.find();
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: any = {};

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

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) res.status(404).send("No podcast found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    await blog?.save();
    res.send(blog);
  } catch (err) {
    res.status(500).send(err);
  }
};
