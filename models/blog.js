/* eslint-disable comma-dangle */
const Joi = require("joi");
const mongoose = require("mongoose");

const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema(
    {
      Title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      imageId: {
        type: String,
        required: true,
      },
      Description: {
        type: String,
        required: true,
      },

      featured: {
        type: Boolean,
        default: false,
      },
      Tags: {
        type: [String],
        required: true,
      },
      Author: {
        type: String,
        required: true,
      },
    },

    {
      timestamps: true,
    }
  )
);

const validateBlog = (blog) => {
  const schema = Joi.object({
    Title: Joi.string().min(5).max(3000).required(),
    image: Joi.string().min(5).max(3000).required(),
    Description: Joi.string().min(5).max(3000).required(),
    featured: Joi.boolean().default(false),
    Tags: Joi.array().items(Joi.string().required()),
    Author: Joi.string().min(5).max(3000).required(),
  });
  return schema.validate(blog);
};
exports.Blog = Blog;
exports.validate = validateBlog;
