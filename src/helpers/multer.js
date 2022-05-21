import multer from "multer";
import path from "path";

const multerImageUpload = multer({
  // storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    // get file extension
    // eslint-disable-next-line no-underscore-dangle
    const _ext = path.extname(file.originalname);
    // Array of acceptable image format extensions
    const ext = [".jpg", ".jpeg", ".png"];
    if (!ext.includes(_ext)) {
      cb(new Error("File format not supported"), false);
      return;
    }
    cb(null, true);
  },
  // limit image file size to 5 megabyte
  limits: { fileSize: 5 * 1024 * 1024 }
}).single("image");

export default multerImageUpload;
