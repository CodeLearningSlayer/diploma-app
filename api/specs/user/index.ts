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

export interface GetUserBySlugResponse {
  user: IUser;
}
