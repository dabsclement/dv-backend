const express = require("express");
const router = express.Router();

const { uploadBook } = require("../controllers/bookController");

router.post("/uploadbook", uploadBook);

module.exports = router;
