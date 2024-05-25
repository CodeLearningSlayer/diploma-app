export interface StartRequest {
  name: string;
  surname: string;
  profession: string;
  avatar: string;
}

export interface IProfile {
  fullName: string;
  profession: string;
  userId: number;
  bio: string;
  birthday: string;
  contact: string;
  company: string;
  slug: string;
  interests: string;
  avatar: string;
  education: string;
  skills: string;
}

export interface StartResponse {
  profile: IProfile;
}

export interface GetRecommendedFriendsResponse {
  peoples: Array<IProfile>;
}
