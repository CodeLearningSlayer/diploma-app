import HttpFactory from "..";
import type {
  DeleteCommentRequest,
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
    const res = await this.delete<void>(
      `/profile/${req.profileId}/post/${req.postId}/comment/${req.commentId}`,
    );
    return res;
  }
}
