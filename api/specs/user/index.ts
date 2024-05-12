export interface IUser {
  id: string;
  slug: string;
  avatar?: {
    src: string;
    srcset: string;
  };
  name: string;
  profession: string;
  profile_completness: number;
  contacts?: {
    email?: string;
    phone?: string;
  };
}

export interface GetUserBySlugRequest {
  slug: string;
}

export interface GetUserBySlugResponse {
  user: IUser;
}

export interface GetMyProfileResponse extends GetUserBySlugResponse {}

interface IPost {
  text: string;
  img: Array<File> | null;
  video: Array<File> | null;
  event: Date | null;
}

export interface CreatePostRequest extends IPost {}

export interface CreatePostResponse {}
