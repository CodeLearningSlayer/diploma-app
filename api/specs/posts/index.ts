export interface IPost {
  id: number;
  text: string;
  images: string[];
  videos: Array<{
    video: string;
    thumbnail: string;
  }>;
  profileId: number;
}

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
