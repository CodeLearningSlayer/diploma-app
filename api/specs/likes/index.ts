export interface LikePostRequest {
  postId: number;
  profileId: number;
}

export interface LikePostResponse {}

export interface DeleteLikeRequest extends LikePostRequest {}
