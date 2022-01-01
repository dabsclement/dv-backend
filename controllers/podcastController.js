const { uploadImage1, deleteImage } = require("../helpers/cloudinary");
const Podcast = require("../models/podcast");

exports.createPodcast = async (req, res) => {
  try {
    const image = await uploadImage1(req.file, "podcastImage", req.body.PodcastUrl);
    const imageDetails = {
      image: image.path,
      imagePublicId: image.name
    };
    Object.assign(req.body, imageDetails);
    const podcast = new Podcast(req.body);

    await podcast.save();
    res.status(200).json({ podcast });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getPodcasts = async (req, res) => {
  try {
    // fetch all podcast
    const podcasts = await Podcast.find({});
    return res.status(200).json({ podcasts });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.podcastList = async (req, res) => {
  try {
    const podcastList = await Podcast.find();
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < podcastList.length) {
      results.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit
      };
    }
    results.results = await Podcast.find().limit(limit).skip(startIndex).exec();
    const paginatedResults = results;
    const totalPage = Math.round(podcastList.length / limit);
    return res.status(200).json({ result: paginatedResults, totalPage });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);
    console.log(podcast);
    let delete = await deleteImage(podcast.imagePublicId)

    if (!podcast) res.status(404).send("No podcast found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updatePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndUpdate(req.params.id, req.body);
    await Podcast.save();
    res.send(podcast);
  } catch (err) {
    res.status(500).send(err);
  }
};
