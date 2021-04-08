var express = require("express");
var router = express.Router();
const { createPodcast, getPodcasts, deletePodcast, podcastList, updatePodcast } = require("../controllers/podcastController");
const { checkAuth, checkAdmin } = require("../Middlewares/auth");

router.post("/addpodcast", checkAdmin, createPodcast);
router.get("/getpodcast", getPodcasts);
router.delete("/deletepodcast/:id", checkAdmin, deletePodcast);
router.get("/podcastbypage", podcastList);
router.patch("/editpodcast/:id", checkAdmin, updatePodcast);

module.exports = router;
