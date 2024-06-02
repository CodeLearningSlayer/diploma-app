export interface SendCommentRequest {
  postId: number;
  profileId: number;
  text: string;
}

export interface SendCommentResponse {
  comment: {
    id: number;
    text: string;
    profileId: number;
    postId: number;
  };
}

export interface DeleteCommentRequest {
  profileId: string;
  postId: string;
  commentId: string;
}
