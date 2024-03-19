import HttpFactory from "~/api/modules";

export default class UserApi extends HttpFactory {
  public async getUserBySlug(_slug: string) {
    return await this.get("/api/user/getInfo");
  }
}
