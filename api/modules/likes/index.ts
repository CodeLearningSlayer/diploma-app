import HttpFactory from "..";
import type { DeleteLikeRequest, LikePostRequest } from "~/api/specs/likes";

const prefix = "likes";

export class LikesService extends HttpFactory {
  public async LikePost(req: LikePostRequest): Promise<void> {
    const res = await this.post<void>(`${prefix}/like-post`, req);
    return res;
  }

  public async DeleteLike(req: DeleteLikeRequest): Promise<void> {
    const res = await this.delete<void>(
      `${prefix}/post/${req.postId}/delete-like/${req.profileId}`,
    );
    return res;
  }
}
