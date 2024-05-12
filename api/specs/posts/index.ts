export interface IPost {
  id: number;
  text: string;
  images: string[];
  videos: string[];
  profileId: number;
}

export interface CreatePostRequest {
  img: File[];
  video: File[];
  text: string;
  event?: Date | string;
}

export interface CreatePostResponse {
  post: IPost;
}
