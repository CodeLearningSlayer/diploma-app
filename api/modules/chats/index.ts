import HttpFactory from "..";
import type {
  CreateChatRequest,
  CreateChatResponse,
  GetChatByIdResponse,
  GetChatMessagesRequest,
  GetChatMessagesResponse,
  GetMyChatsResponse,
} from "~/api/specs/chats";

const prefix = "/chats";

export class ChatsService extends HttpFactory {
  public async CreateChat(req: CreateChatRequest): Promise<CreateChatResponse> {
    const res = await this.post<CreateChatResponse>(`${prefix}/create`, req);
    return res;
  }

  public async GetMyChats(): Promise<GetMyChatsResponse> {
    const res = await this.get<GetMyChatsResponse>(`${prefix}/my`);
    return res;
  }

  public async GetChatById(id: number): Promise<GetChatByIdResponse> {
    const res = await this.get<GetChatByIdResponse>(`${prefix}/${id}`);
    return res;
  }

  public async GetChatMessages(req: GetChatMessagesRequest): Promise<GetChatMessagesResponse> {
    const res = await this.get<GetChatMessagesResponse>(`${prefix}/${req.chatId}/messages`, {
      query: {
        offset: req.offset,
      },
    });
    return res;
  }
}
