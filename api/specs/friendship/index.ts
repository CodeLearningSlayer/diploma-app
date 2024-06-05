import type { IProfile } from "../profile";
import type { IUser } from "../user";

export interface AddFriendRequest {
  profileId: number;
  friendProfileId: number;
}

export interface DeleteFriendRequest extends AddFriendRequest {}

export interface AddFriendResponse extends IUser {}

export interface GetFriendsRequest {
  profileId: number;
}

export interface GetFriendsResponse extends Array<IUser> {}

export interface SearchFriendRequest {
  profileId: string;
  searchTerm: string;
}

export interface SearchFriendResponse extends Array<IProfile> {}

export interface CancelDeleteRequest extends AddFriendRequest {}

export interface GetFriendsRequestsBody {
  profileId: number;
}

export interface GetFriendsRequestsResponse extends Array<IProfile> {}

export interface AcceptFriendRequest extends AddFriendRequest {}

export interface GetSentRequestsRequest extends GetFriendsRequestsBody {}

export interface GetSentRequestsResponse extends GetFriendsRequestsResponse {}
