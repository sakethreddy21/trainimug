import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface Post {
  id?: number;
  title: string;
  content: string;
}

export interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

export const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      state.posts = state.posts.filter(post => post.id !== idToDelete);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const updatedPost = action.payload;
      const index = state.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    },
  },
});

export const { addPost, deletePost, updatePost } = PostsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: number) => {
  return state.posts.posts.find((post: { id: number; }) => post.id === postId);
};

export default PostsSlice.reducer;
