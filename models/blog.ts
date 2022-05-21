import mongoose from "mongoose";

const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },

      featured: {
        type: Boolean,
        default: false,
      },
      tags: {
        type: [String],
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
    },

    {
      timestamps: true,
    }
  )
);

export default Blog;
