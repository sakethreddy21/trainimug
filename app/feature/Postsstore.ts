import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface Post {
  id?: number;
  title: string;
  liked?: boolean;
  saved?: boolean;
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
    likePost: (state, action: PayloadAction<Post>) => {
      const {id }= action.payload;
        const existingItem = state.posts.find(item => item.id === id && item.liked);
        if (!existingItem) {
          state.posts.push({ ...action.payload });
        }
    },
    savePost: (state, action: PayloadAction<Post>) => {
      const {id }= action.payload;
        const existingItem = state.posts.find(item => item.id === id && item.saved);
        if (!existingItem) {
          state.posts.push({ ...action.payload });
        }
    },
    unLikePost: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      state.posts = state.posts.filter(item => item.id !== idToDelete || !item.liked);
    },
    unSavePost: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      state.posts = state.posts.filter(item => item.id !== idToDelete || !item.saved);
    },
    
    
  },
});

export const { likePost, unLikePost, savePost, unSavePost } = PostsSlice.actions;

export const selectAllPosts = (state: RootState) => state.PostsSlice.posts;

export const selectLikedPosts = (state: RootState) => state.PostsSlice.posts.filter((post: { liked?: boolean }) => post.liked);

export const selectSavedPosts = (state: RootState) => state.PostsSlice.posts.filter((post: { saved?: boolean }) => post.saved);

export const isPostLiked = (state: RootState, postId: number): boolean => state.PostsSlice.posts.some((post: Post) => post.id === postId && post.liked);

export const isPostSaved = (state: RootState, postId: number): boolean => state.PostsSlice.posts.some((post: Post) => post.id === postId && post.saved);

export default PostsSlice.reducer;
