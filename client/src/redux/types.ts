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
  threads: [
    {
      _id: string;
      admin: {
        _id: string;
        username: string;
        email: string;
        profilePic: string;
        followers: string[];
        threads: string[];
        replies: string[];
        reposts: string[];

        public_id: string;
      };
      text: string;
      media: string;
      public_id: string;
      likes: [
        {
          _id: string;
          username: string;
          email: string;
          profilePic: string;
          followers: string[];
          threads: string[];
          replies: string[];
          reposts: string[];
        }
      ];
      comments: [
        {
          _id: string;
          admin: {
            _id: string;
            username: string;
            email: string;
            profilePic: string;
            followers: string[];
            threads: string[];
            replies: string[];
            reposts: string[];
          };
          post: string;
          text: string;
        }
      ];
    }
  ];
  replies: [
    {
      _id: string;
      admin: {
        _id: string;
        username: string;
        email: string;
        profilePic: string;
        followers: string[];
        threads: string[];
        replies: string[];
        reposts: string[];
      };
      post: string;
      text: string;
    }
  ];
  reposts: [
    {
      _id: string;
      admin: {
        _id: string;
        username: string;
        email: string;
        profilePic: string;
        followers: string[];
        threads: string[];
        replies: string[];
        reposts: string[];

        public_id: string;
      };
      text: string;
      media: string;
      public_id: string;
      likes: [
        {
          _id: string;
          username: string;
          email: string;
          profilePic: string;
          followers: string[];
          threads: string[];
          replies: string[];
          reposts: string[];
        }
      ];
      comments: [
        {
          _id: string;
          admin: {
            _id: string;
            username: string;
            email: string;
            profilePic: string;
            followers: string[];
            threads: string[];
            replies: string[];
            reposts: string[];
          };
          post: string;
          text: string;
        }
      ];
    }
  ];
}

export interface searchProp {
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
  text: string;
  media: string;
  public_id: string;

  likes: Array<{
    _id: string;
    username: string;
    email: string;
    profilePic: string;
    followers: string[];
    threads: string[];
    replies: string[];
    reposts: string[];
  }>;

  comments: Array<{
    _id: string;
    admin: {
      _id: string;
      username: string;
      email: string;
      profilePic: string;
      followers: string[];
      threads: string[];
      replies: string[];
      reposts: string[];
    };
    post: string;
    text: string;
  }>;

  admin: {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
    followers: string[];
    threads: string[];
    replies: string[];
    reposts: string[];

    public_id: string;
  };
}
export interface PostResponse {
  message: string;
  posts: Post[];
}
export interface searchResponse {
  users: searchProp[];
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
}
export interface deleteCommentRequest {
  postId: string;
  id: string;
}
export interface updateProfileRequest {
  text?: string;
  media?: File | string;
}
export interface searchUserResponse {
  users: searchProp[];
}
export interface PostProps {
  post: {
    _id: string;
    text: string;
    media: string;
    public_id: string;

    likes: Array<{
      _id: string;
      username: string;
      email: string;
      profilePic: string;
      followers: string[];
      threads: string[];
      replies: string[];
      reposts: string[];
    }>;

    comments: Array<{
      _id: string;
      admin: {
        _id: string;
        username: string;
        email: string;
        profilePic: string;
        followers: string[];
        threads: string[];
        replies: string[];
        reposts: string[];
      };
      post: string;
      text: string;
    }>;

    admin: {
      _id: string;
      username: string;
      email: string;
      profilePic: string;
      followers: string[];
      threads: string[];
      replies: string[];
      reposts: string[];

      public_id: string;
    };
  };
}
export interface SearchUserProp {
  user: {
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
  };
}

export interface CommentProps {
  comment: {
    _id: string;
    admin: {
      _id: string;
      username: string;
      email: string;
      profilePic: string;
      followers: string[];
      threads: string[];
      replies: string[];
      reposts: string[];
    };
    post: string;
    text: string;
  };
  postId: string;
}

export interface AddPostRequest {
  text?: string;
  media?: string | File;
}
