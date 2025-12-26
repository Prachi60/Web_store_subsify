
import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    count: 0,
    cartProductIds: [],
  },
  reducers: {
    setCartProductIds: (state, action) => {
      state.cartProductIds = action.payload;
      state.count = action.payload.length;
    },

    addCartProductId: (state, action) => {
      if (!state.cartProductIds.includes(action.payload)) {
        state.cartProductIds.push(action.payload);
        state.count += 1;
      }
    },

    removeCartProductId: (state, action) => {
      state.cartProductIds = state.cartProductIds.filter(
        (id) => id !== action.payload
      );
      state.count -= 1;
    },
  },
});

export const {
  setCartProductIds,
  addCartProductId,
  removeCartProductId,
} = cardSlice.actions;

export default cardSlice.reducer;
