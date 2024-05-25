import HttpFactory from "..";
import type {
  GetMyProfileResponse,
  GetUserBySlugRequest,
  GetUserBySlugResponse,
} from "~/api/specs/user";
import type {
  GetRecommendedFriendsResponse,
  StartRequest,
  StartResponse,
} from "~/api/specs/profile";

const prefix = "/profile";

export class ProfileService extends HttpFactory {
  public async Start(req: StartRequest): Promise<StartResponse> {
    const res = await this.put<StartResponse>(`${prefix}/start`, req);
    return res;
  }

  public async GetUserBySlug(req: GetUserBySlugRequest): Promise<GetUserBySlugResponse> {
    const res = await this.get<GetUserBySlugResponse>(`${prefix}/${req.slug}`);
    return res;
  }

  public async GetMyProfile(): Promise<GetMyProfileResponse> {
    const res = await this.get<GetMyProfileResponse>(`${prefix}/me`);
    return res;
  }

  public async GetRecommendedFriends(): Promise<GetRecommendedFriendsResponse> {
    const res = await this.get<GetRecommendedFriendsResponse>(`${prefix}/recommended-friends`, {
      query: {
        limit: 5,
        offset: 0,
      },
    });
    return res;
  }
}
