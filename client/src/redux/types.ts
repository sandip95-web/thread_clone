export interface signInRequest {
  username: string;
  email: string;
  password: string;
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
export interface getResponse {
  success?: boolean;
  data?: myInfo;
  message?: string;
}

export interface Post{
  _id:string,
  admin: string;
  text: string;
  media: string;
  public_id: string;
  likes: string[];
  comments: string[];
}
export interface PostResponse{
message:string;
posts:Post[]
}
export interface searchResponse{
  users:myInfo[];
}