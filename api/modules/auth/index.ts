import HttpFactory from "..";

const prefix = "/auth";

export class AuthService extends HttpFactory {
  public async Login(req: LoginRequest): Promise<LoginResponse> {
    return await this.post<LoginResponse>(`${prefix}/login`, req);
  }

  public async Register(req: RegisterRequest): Promise<RegisterResponse> {
    return await this.post<RegisterResponse>(`${prefix}/registration`, req);
  }

  public async Refresh(req: RefreshRequest): Promise<RefreshResponse> {
    return await this.post<RefreshResponse>(`${prefix}/refresh`, req);
  }
}
