import HttpFactory from "..";
import type { AddFriendRequest, AddFriendResponse } from "~/api/specs/friendship";

const prefix = "/friends";

export class FriendshipService extends HttpFactory {
  public async AddFriend(req: AddFriendRequest): Promise<AddFriendResponse> {
    const res = await this.post<AddFriendResponse>(
      `${prefix}/${req.profileId}/add/${req.friendProfileId}`,
      req,
    );
    return res;
  }
}
