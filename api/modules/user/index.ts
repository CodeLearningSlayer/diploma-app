import HttpFactory from "~/api/modules";
import { type GetUserBySlugResponse } from "~/api/specs/user";

export default class UserService extends HttpFactory {
  public async GetUserBySlug(_slug: string): Promise<GetUserBySlugResponse> {
    return await this.get<GetUserBySlugResponse>("/api/user/getInfo");
  }
}
