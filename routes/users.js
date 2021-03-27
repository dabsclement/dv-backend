
var express = require("express");
var router = express.Router();
const { newsLetter } = require("../controllers/subscribe");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/subscribe", newsLetter);

module.exports = router;
