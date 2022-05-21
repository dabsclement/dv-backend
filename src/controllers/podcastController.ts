import { Request, Response } from "express";
import { uploadImage1, deleteImage } from "@helpers/cloudinary";
import Podcast from "@models/podcast";
import { validatePodcast } from "@helpers/validate";

export const createPodcast = async (req: Request, res: Response) => {
  const { error } = validatePodcast(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const image: any = await uploadImage1(req.file, "podcastImage", req.body.PodcastUrl);
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

export const getPodcasts = async (req: Request, res: Response) => {
  try {
    // fetch all podcast
    const podcasts = await Podcast.find({});
    return res.status(200).json({ podcasts });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const podcastList = async (req: Request, res: Response) => {
  try {
    const podcastList = await Podcast.find();
    const page = parseInt((req.query.page as string));
    const limit = parseInt((req.query.limit as string));

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: any = {};

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

export const deletePodcast = async (req: Request, res: Response) => {
  try {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);
    console.log(podcast);
    const delet = await deleteImage(podcast.imagePublicId)

    if (!podcast) res.status(404).send("No podcast found");
    res.status(200).send(delet);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updatePodcast = async (req: Request, res: Response) => {
  try {
    const podcast = await Podcast.findByIdAndUpdate(req.params.id, req.body);
    await podcast?.save();
    return res.send(podcast);
  } catch (err: any) {
    return res.status(500).send(err);
  }
};
