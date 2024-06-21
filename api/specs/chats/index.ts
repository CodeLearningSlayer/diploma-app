import type { IProfile } from "../profile";
import type { IUser } from "../user";

export interface CreateChatRequest {
  profileId1: number;
  profileId2: number;
}

export interface IMessage {
  text: string;
  profileId: number;
  chatId: number;
  profile: IUser;
}

export interface IChat {
  id: number;
  profileId1: number;
  profileId2: number;
  profile1?: IProfile;
  profile2?: IProfile;
  messages: IMessage[];
}

export interface CreateChatResponse {
  chat: IChat;
}

export interface GetMyChatsResponse {
  chats: IChat[];
}

export interface GetChatByIdResponse {
  chat: IChat;
}
