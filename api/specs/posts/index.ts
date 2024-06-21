import type { IUser } from "../user";

export interface CreatePostRequest {
  img?: string[];
  video?: {
    video: string;
    thumbnail: string;
  }[];
  text: string;
  event?: Date | string;
}

export interface CreatePostResponse {
  post: IPost;
}

export interface DeletePostRequest {
  id: number;
}

export interface DeletePostResponse {}

export interface GetProfilePostsRequest {
  profileId: number;
}

export interface IComment {
  id: number;
  profile: IUser;
  text: string;
}

export interface IPost {
  id: number;
  text: string;
  images: string[];
  videos: Array<{
    video: string;
    thumbnail: string;
  }>;
  likes: Array<any>;
  comments: IComment[];
  profileId: number;
}

export interface GetProfilePostsResponse {
  posts: Array<IPost>;
}
