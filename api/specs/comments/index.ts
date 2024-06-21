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
  commentId: number;
}

export interface LoadAllPostCommentsRequest {
  postId: number;
}

export interface LoadAllPostCommentsResponse {
  comments: {
    id: number;
    text: string;
    profileId: number;
    postId: number;
  }[];
}
