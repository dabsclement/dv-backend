const multer = require("multer");
const path = require("path");

// eslint-disable-next-line no-unused-vars
function fileTypecheck(file, cb) {
  // accepted file extension
  const filetypes = /jpg|jpeg|png/;

  // getting the file extension
  const extensionName = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  // checking for the mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extensionName) {
    return cb(null, true);
  }
  return cb(new Error("Error Occured: The file type isnt allowed"));
}

const storage = multer.diskStorage({
  destination: "./public/image",
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const imageUpload = multer({
  storage,
  //   fileFilter: fileTypecheck,
}).single("image");

module.exports = { imageUpload };
