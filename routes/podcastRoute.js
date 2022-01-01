var express = require("express");
// const multer = require("multer");
var router = express.Router();
const { createPodcast, getPodcasts, deletePodcast, podcastList, updatePodcast } = require("../controllers/podcastController");
const { default: multerImageUpload } = require("../helpers/multer");
const { checkAuth, checkAdmin } = require("../Middlewares/auth");

router.post("/addpodcast", multerImageUpload, createPodcast);
router.get("/getpodcast", getPodcasts);
router.delete("/deletepodcast/:id", checkAdmin, deletePodcast);
router.get("/podcastbypage", podcastList);
router.patch("/editpodcast/:id", checkAdmin, updatePodcast);

module.exports = router;
