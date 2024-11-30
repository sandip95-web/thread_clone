export interface signInRequest {
  username: string;
  email: string;
  password: string;
}
export interface signInResponse {
  success: string;
  message: string;
}
export interface loginRequest {
  email: string;
  password: string;
}

export interface myInfo {
  _id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePic: string;
  public_id: string;
  followers: string[];
  threads: string[];
  replies: string[];
  reposts: string[];
}
export interface myInfoResponse {
  data: myInfo;
}
