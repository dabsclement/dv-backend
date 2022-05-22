import multerImageUpload from "@helpers/multer";
import {
  createBlog,
  getBlogs,
  deleteBlog,
  blogList,
  updateBlog,
} from "@controllers/blogController";
import { uploadBook } from "@controllers/bookController";
import {
  createPodcast,
  getPodcasts,
  deletePodcast,
  podcastList,
  updatePodcast,
} from "@controllers/podcastController";
import { newsletter } from "@controllers/subscribe";
import { signup, login } from "@controllers/userController";
import { checkAdmin } from "@middlewares/auth";
import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/test", function (req, res, next) {
  // res.render("index", { title: "Express" });
  res.send("testing server");
});

/* BLOG ROUTES */
router.post("/addblog", createBlog);
router.get("/getblogs", getBlogs);
router.delete("/deleteblog/:id", deleteBlog);
router.get("/blogbypage", blogList);
router.patch("/editblog/:id", updateBlog);

/* BOOK ROUTE */
router.post("/uploadbook", uploadBook);

/* PODCAST ROUTE */
router.post("/addpodcast", multerImageUpload, createPodcast);
router.get("/getpodcast", getPodcasts);
router.delete("/deletepodcast/:id", checkAdmin, deletePodcast);
router.get("/podcastbypage", podcastList);
router.patch("/editpodcast/:id", checkAdmin, updatePodcast);

/* PODCAST ROUTE */
router.post("/subscribe", newsletter);
router.post("/signup", signup);
router.post("/login", login);

export default router;
