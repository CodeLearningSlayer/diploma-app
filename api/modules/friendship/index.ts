import HttpFactory from "..";
import type {
  AcceptFriendRequest,
  AddFriendRequest,
  AddFriendResponse,
  CancelDeleteRequest,
  DeleteFriendRequest,
  GetFriendsRequest,
  GetFriendsRequestsBody,
  GetFriendsRequestsResponse,
  GetFriendsResponse,
  GetSentRequestsRequest,
  GetSentRequestsResponse,
  SearchFriendRequest,
  SearchFriendResponse,
} from "~/api/specs/friendship";

const prefix = "/friends";

export class FriendshipService extends HttpFactory {
  public async AddFriend(req: AddFriendRequest): Promise<AddFriendResponse> {
    const res = await this.post<AddFriendResponse>(
      `${prefix}/${req.profileId}/add/${req.friendProfileId}`,
      req,
    );
    return res;
  }

  public async GetFriends(req: GetFriendsRequest): Promise<GetFriendsResponse> {
    const res = await this.get<GetFriendsResponse>(`${prefix}/${req.profileId}`);
    return res;
  }

  public async DeleteFriend(req: DeleteFriendRequest): Promise<void> {
    const res = await this.delete<void>(`${prefix}/${req.profileId}/delete/${req.friendProfileId}`);
    return res;
  }

  public async FindFriends(req: SearchFriendRequest): Promise<SearchFriendResponse> {
    const res = await this.get<SearchFriendResponse>(`${prefix}/search`, {
      query: {
        profileId: req.profileId,
        searchTerm: req.searchTerm,
      },
    });
    return res;
  }

  public async CancelDelete(req: CancelDeleteRequest): Promise<void> {
    const res = await this.post<void>(
      `${prefix}/${req.profileId}/cancel-delete/${req.friendProfileId}`,
    );
    return res;
  }

  public async GetFriendsRequests(
    req: GetFriendsRequestsBody,
  ): Promise<GetFriendsRequestsResponse> {
    const res = await this.get<GetFriendsRequestsResponse>(`${prefix}/${req.profileId}/requests`);
    return res;
  }

  public async GetDeclinedRequests(
    req: GetFriendsRequestsBody,
  ): Promise<GetFriendsRequestsResponse> {
    const res = await this.get<GetFriendsRequestsResponse>(`${prefix}/${req.profileId}/declined`);
    return res;
  }

  public async AcceptFriend(req: AcceptFriendRequest): Promise<void> {
    const res = await this.post<void>(`${prefix}/${req.profileId}/accept/${req.friendProfileId}`);
    return res;
  }

  public async GetSentRequests(req: GetSentRequestsRequest): Promise<GetSentRequestsResponse> {
    const res = await this.get<GetSentRequestsResponse>(`${prefix}/${req.profileId}/sent-requests`);
    return res;
  }
}
