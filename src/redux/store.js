import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import cardReducer from "./cardSlice"
import wishlistReducer from "./wishlistSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    card :cardReducer,
    wishlist:wishlistReducer,
  },
});
