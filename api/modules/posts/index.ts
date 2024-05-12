import dayjs from "dayjs";
import HttpFactory from "..";
import type { CreatePostRequest, CreatePostResponse } from "~/api/specs/posts";

const prefix = "/posts";

export class PostsService extends HttpFactory {
  public async CreatePost(req: CreatePostRequest): Promise<CreatePostResponse> {
    const postFormData = new FormData();

    req.video?.forEach(video => {
      postFormData.append("video", video);
    });
    req.img?.forEach(img => {
      postFormData.append("img", img);
    });

    postFormData.append("text", req.text);
    if (req.event) {
      postFormData.append("event", dayjs(req.event).format("YYYY-MM-DD"));
    }
    const res = await this.post<CreatePostResponse>(`${prefix}`, postFormData);
    return res;
  }
}
