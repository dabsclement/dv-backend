import mongoose from "mongoose";

const PodcastSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true

  },
  PodcastUrl: {
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

  }
},

{
  timestamps: true
}
);

module.exports = mongoose.model("podcast", PodcastSchema);
