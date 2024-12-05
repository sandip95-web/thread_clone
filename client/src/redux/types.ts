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

export interface Post {
  _id: string;
  admin: string;
  text: string;
  media: string;
  public_id: string;
  likes: string[];
  comments: string[];
}
export interface PostResponse {
  message: string;
  posts: Post[];
}
export interface searchResponse {
  users: myInfo[];
}
export interface newPostResponse {
  message: string;
  newPost: Post;
}
export interface singlePostResponse {
  message: string;
  post: Post;
}
export interface addCommentRequest {
  id: string;
  text: string;
  admin: string;
  post: string;
}
export interface deleteCommentRequest {
  postId: string;
  id: string;
}
export interface updateProfileRequest {
  text: string;
  media: File;
}
export interface searchUserResponse{
  users:myInfo[]
}