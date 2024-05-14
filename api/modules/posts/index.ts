import dayjs from "dayjs";
import HttpFactory from "..";
import type { CreatePostRequest, CreatePostResponse } from "~/api/specs/posts";

const prefix = "/posts";

export class PostsService extends HttpFactory {
  public async CreatePost(req: CreatePostRequest): Promise<CreatePostResponse> {
    if (req.event) {
      req.event = dayjs(req.event).format("YYYY-MM-DD");
    }
    const res = await this.post<CreatePostResponse>(`${prefix}`, req);
    return res;
  }
}
