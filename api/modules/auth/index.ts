import HttpFactory from "..";
import type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
} from "~/api/specs/auth";

const prefix = "/auth";

export class AuthService extends HttpFactory {
  public async Login(req: LoginRequest): Promise<LoginResponse> {
    const res = await this.post<LoginResponse>(`${prefix}/login`, req);
    return res;
  }

  public async Register(req: RegisterRequest): Promise<RegisterResponse> {
    const res = await this.post<RegisterResponse>(`${prefix}/registration`, req);
    return res;
  }

  public async Refresh(req: RefreshRequest): Promise<RefreshResponse> {
    const res = await this.post<RefreshResponse>(`${prefix}/refresh`, req);
    return res;
  }
}
