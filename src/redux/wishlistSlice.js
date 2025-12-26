import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    count: 0,
    items: [],
    
  },
  reducers: {
    setWishlistCount: (state, action) => {
      state.count = action.payload;
    },
  
    addWishlistItem: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        state.count = state.items.length;
      }
    },

    removeWishlistItem: (state, action) => {
      state.items = state.items.filter((id) => id !== action.payload);
      state.count = state.items.length;
    },

  },
});

export const {
  setWishlistCount,
  increaseWishlist,
  decreaseWishlist,
  addWishlistItem,
  removeWishlistItem,
  setItemsIds
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
