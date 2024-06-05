import HttpFactory from "..";
import type {
  DeleteCommentRequest,
  LoadAllPostCommentsRequest,
  LoadAllPostCommentsResponse,
  SendCommentRequest,
  SendCommentResponse,
} from "~/api/specs/comments";

const prefix = "/comments";

export class CommentsService extends HttpFactory {
  public async SendComment(req: SendCommentRequest): Promise<SendCommentResponse> {
    const res = await this.post<SendCommentResponse>(`${prefix}/comment`, req);
    return res;
  }

  public async DeleteComment(req: DeleteCommentRequest): Promise<void> {
    const res = await this.delete<void>(`${prefix}/delete/${req.commentId}`);
    return res;
  }

  public async LoadAllPostComments(
    req: LoadAllPostCommentsRequest,
  ): Promise<LoadAllPostCommentsResponse> {
    const res = await this.get<LoadAllPostCommentsResponse>(`${prefix}/post/${req.postId}`, {
      query: {
        offset: 3,
      },
    });
    return res;
  }
}
