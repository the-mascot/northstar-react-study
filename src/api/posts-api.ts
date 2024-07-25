import { Post, PostCreateReq } from 'src/types/post.type';
import { axiosInstance } from 'src/api/axios';

const headers = {
  'Content-type': 'application/json; charset=UTF-8',
}

/*게시글 목록 fetch*/
export const fetchPosts = async (): Promise<Post[]> => {
  return await axiosInstance.get('https://jsonplaceholder.typicode.com/posts').then((response) => response.data);
};

/*게시글 detail fetch*/
export const fetchPost = async (id: number): Promise<Post> => {
  return await axiosInstance.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((response) => response.data);
};

/*게시글 POST*/
export const createPost = async (data: PostCreateReq): Promise<Post> => {
  return await axiosInstance.post('https://jsonplaceholder.typicode.com/posts', data, { headers: headers }).then((response) => response.data);
}

/*게시글 PUT*/
export const updatePost = async (data: Post): Promise<Post> => {
  return await axiosInstance.put(`https://jsonplaceholder.typicode.com/posts/${data.id}`, data, { headers: headers }).then((response) => response.data);
}

/*게시글 DELETE*/
export const deletePost = async (id: number) => {
  return await axiosInstance.delete(`https://jsonplaceholder.typicode.com/posts/${id}`, { headers: headers }).then((response) => response.data);
}
