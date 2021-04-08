
var express = require("express");
var router = express.Router();
const { newsletter } = require("../controllers/subscribe");
const { signup, login } = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/subscribe", newsletter);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
