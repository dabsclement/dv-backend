import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
      required: true,
    },
    podcastUrl: {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.podcast ||
  mongoose.model("podcast", podcastSchema);
