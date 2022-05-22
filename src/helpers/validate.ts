import Joi from "joi";
import {
  IBlogModel,
  IBookModel,
  IPodcastModel,
  IUserModel,
} from "../interface/model.interface";

export const validateBlog = (blog: IBlogModel) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(3000).required(),
    image: Joi.string().min(5).max(3000).required(),
    description: Joi.string().min(5).max(3000).required(),
    featured: Joi.boolean().default(false),
    tags: Joi.array().items(Joi.string().required()),
    author: Joi.string().min(5).max(3000).required(),
  });
  return schema.validate(blog);
};

export const validateBook = (book: IBookModel) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(3000).required(),
    bookCover: Joi.string().min(5).max(3000).required(),
    bookUrl: Joi.string().min(5).max(3000).required(),
  });
  return schema.validate(book);
};

export const validatePodcast = (podcast: IPodcastModel) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(3000).required(),
    images: Joi.string().min(5).max(3000).required(),
    imagePublicId: Joi.string().min(5).max(3000).required(),
    podcastUrl: Joi.string().min(5).max(3000).required(),
    description: Joi.string().min(5).max(3000).required(),
    featured: Joi.boolean().default(false),
    tags: Joi.array().items(Joi.string().required()),
  });
  return schema.validate(podcast);
};

export const validateUser = (user: IUserModel) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(3000).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(5).max(3000).required(),
    isAdmin: Joi.boolean().default(false),
    password: Joi.string().min(6).max(3000).required(),

  });
  return schema.validate(user);
};
