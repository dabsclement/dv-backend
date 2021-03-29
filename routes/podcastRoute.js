var express = require("express");
var router = express.Router();
const { createPodcast, getPodcasts, deletePodcast, podcastList, updatePodcast } = require("../controllers/podcastController");

router.post("/addpodcast", createPodcast);
router.get("/getpodcast", getPodcasts);
router.delete("/deletepodcast/:id", deletePodcast);
router.get("/podcastbypage", podcastList);
router.patch("/editpodcast/:id", updatePodcast);

module.exports = router;
