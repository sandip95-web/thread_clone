export interface signInRequest {
  username:string;
  email: string;
  password: string;
}
export interface signInResponse {
  success: string;
  message: string;
}
