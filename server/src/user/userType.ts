export interface User{
  username:string,
  email:string,
  password:string,
  bio:string,
  profilePic:string,
  public_id:string,
  followers:string[],
  threads:string[],
  replies:string[],
  reposts:string[],
}