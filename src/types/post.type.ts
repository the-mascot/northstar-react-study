export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostCreateReq {
  userId: number;
  title: string;
  body: string;
}
