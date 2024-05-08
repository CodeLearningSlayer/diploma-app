import type { IUser } from "../user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {}

export interface LoginResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse extends LoginResponse {}

export interface RefreshResponse {
  accessToken: string;
}

export interface RefreshRequest {
  refreshToken: string;
}
