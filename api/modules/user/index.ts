import dayjs from "dayjs";
import HttpFactory from "~/api/modules";
import {
  type CreatePostRequest,
  type CreatePostResponse,
  type GetUserBySlugResponse,
} from "~/api/specs/user";

export default class UserService extends HttpFactory {
  public async GetUserBySlug(_slug: string): Promise<GetUserBySlugResponse> {
    return await this.get<GetUserBySlugResponse>("/user/getInfo");
  }

  public async GetMyProfile(): Promise<GetUserBySlugResponse> {
    return await this.get<GetUserBySlugResponse>("/api/user/me");
  }

  public async CreatePost(postData: CreatePostRequest): Promise<CreatePostResponse> {
    const postFormData = new FormData();

    postData.video?.forEach(video => {
      postFormData.append("video", video);
    });
    postData.img?.forEach(img => {
      postFormData.append("image", img);
    });

    postFormData.append("text", postData.text);
    if (postData.event) {
      postFormData.append("event", dayjs(postData.event).format("YYYY-MM-DD"));
    }

    return await this.post<CreatePostResponse>("/api/user/createPost", postFormData);
  }
}
