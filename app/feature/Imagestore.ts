import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface LikedSaved {

  id?: number;
  title: string;
  liked?: boolean;
  saved?: boolean;
}

export interface LikedsSavedsState {
  Likeds: LikedSaved[];
}


const initialState: LikedsSavedsState = {
  Likeds: [],
};

export const LikedsSavedsSlice = createSlice({
  name: "LikedsSaveds",
 
  initialState,
  reducers: {

    
    
    createLiked: (state, action: PayloadAction<LikedSaved>) => {
      const { id } = action.payload;

      // Check if an item with the same ID and saved as true exists
      const existingItem = state.Likeds.find(item => item.id === id && item.liked);

      // If no existing item found, add the new item
      if (!existingItem) {
        state.Likeds.push({ ...action.payload });
      }
    },
    createSaved: (state, action: PayloadAction<LikedSaved>) => {
      const { id } = action.payload;

      // Check if an item with the same ID and saved as true exists
      const existingItem = state.Likeds.find(item => item.id === id && item.saved);

      // If no existing item found, add the new item
      if (!existingItem) {
        state.Likeds.push({ ...action.payload });
      }

    },
    deleteLiked: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      // Filter out the item with the specified ID and liked is true
      state.Likeds = state.Likeds.filter(item => item.id !== idToDelete || !item.liked);
    },
    deleteSaved: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      state.Likeds = state.Likeds.filter(item => item.id !== idToDelete || !item.saved);
    },

  },
});

export const { createLiked,createSaved, deleteLiked, deleteSaved } = LikedsSavedsSlice.actions;

export const selectLikedsSaved = (state: RootState) => state.LikedsSaveds.Likeds;

export const selectLikedData = (state: RootState) => state.LikedsSaveds.Likeds.filter((item: { liked: boolean; }) => item.liked === true);
export const selectSavedData = (state: RootState) => state.LikedsSaveds.Likeds.filter((item: { saved: boolean; }) => item.saved === true);

export const isIdLiked = (state: RootState, id: number): boolean => {
  const likedData = selectLikedData(state);
  return likedData.some((item: { id: number; }) => item.id === id);
};

export const isIdSaved = (state: RootState, id: number): boolean => {
  const savedData = selectSavedData(state);
  return savedData.some((item: { id: number; }) => item.id === id);
};




export default LikedsSavedsSlice.reducer;