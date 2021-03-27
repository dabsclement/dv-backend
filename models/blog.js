import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true

  },
  Description: {
    type: String,
    required: true

  },

  featured: {
    type: Boolean,
    default: false
  },
  Tags: {
    type: [String],
    required: true

  },
  Author: {
    type: String,
    required: true

  }
},

{
  timestamps: true
}
);
module.exports = mongoose.model("blog", BlogSchema);
