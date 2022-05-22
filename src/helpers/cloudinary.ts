import _cloudinary from "cloudinary";
import streamifier from "streamifier";
const cloudinary = _cloudinary.v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

const uploadImage = async (image: any, folder: any, podcast: any) => {
  const uploadedImage = await cloudinary.uploader.upload((image.path as string), {
    folder: `drummersville/${folder}/${podcast}`,
  });
  return uploadedImage;
};

const deleteImage = async (cloudinaryId: string) => {
  await cloudinary.uploader.destroy(cloudinaryId);
};

const toBuffer = (arrayBuffer: any) => {
  const buf = Buffer.alloc(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);
  for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
};

const uploadImage1 = async (image: any, folder: any, podcast: any) => {
  console.log(image, folder, podcast);
  return new Promise((resolve, reject) => {
    console.log("hello");
    const cldUploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `drummersville/${folder}/${podcast}`,
      },
      async function (error, result) {
        if (result) {
          resolve({
            path: result.url,
            name: result.public_id,
          });
        } else {
          console.log(error);
          reject(error);
        }
      }
    );
    console.log("wassup");
    streamifier.createReadStream(toBuffer(image.buffer)).pipe(cldUploadStream);
    // console.log(stream);
  });
};

export { cloudinary, uploadImage, deleteImage, uploadImage1 };
