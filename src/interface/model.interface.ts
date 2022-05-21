export interface IBlogModel {
  title: string;
  image: string;
  description: string;
  featured: boolean;
  tags: string[];
  author: string;
}

export interface IBookModel {
  title: string;
  bookCover: string;
  bookUrl: string;
}

export interface IPodcastModel {
  title: string;
  images: string;
  imagePublicId: string;
  podcastUrl: string;
  description: string;
  featured: boolean;
  tags: string[];
}

export interface IUserModel {
    username: string;
    email: string;
    isAdmin: boolean;
    password: string;
}