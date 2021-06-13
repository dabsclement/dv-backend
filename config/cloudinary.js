const cloudinary = require("cloudinary").v2;
require("dotenv");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const imageUploader = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return {
      publicId: result.public_id,
      imageUrl: result.url,
    };
  } catch (error) {
    return error;
  }
};

module.exports = { imageUploader };
