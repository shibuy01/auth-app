import type User from "./User";

export default interface LoginResponseData {
  token: string;
  token_type: string;
  expires_in: string;
  access_token: string;
  user: User;
}