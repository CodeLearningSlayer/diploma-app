import HttpFactory from "..";
import type { StartRequest, StartResponse } from "~/api/specs/profile";

const prefix = "/profile";

export class ProfileService extends HttpFactory {
  public async Start(req: StartRequest): Promise<StartResponse> {
    const res = await this.put<StartResponse>(`${prefix}/start`, req);
    return res;
  }
}
