import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); 
          if (!token) 
            return  rejectWithValue("Login first");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/addtocart`,
        { product: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return {
        product,
        cartItemId: res.data.result._id,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Add to cart failed");
    }
  }
);


export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/deletecartitem/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return { productId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Remove failed");
    }
  }
);


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getcartitem`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.result.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch failed");
    }
  }
);

const initialState = {
  count: 0,
  refresh: false,
  cartProductIds: [],
  orderSummary: null,
  subscriptionType: null,
  duration: null,
  isSubscribed: false,
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
   

    setCartCount: (state, action) => {
      state.count = action.payload;
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    increase: (state) => {
      state.count += 1;
    },

    decrease: (state) => {
      if (state.count > 0) state.count -= 1;
    },

    refreshCartState: (state) => {
      state.refresh = !state.refresh;
    },

    setCartProductIds: (state, action) => {
      state.cartProductIds = action.payload;
    },

    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },

    setSubscriptionDetails: (state, action) => {
      state.subscriptionType = action.payload.subscriptionType;
      state.duration = action.payload.duration;
    },

    clearSubscriptionDetails: (state) => {
      state.subscriptionType = null;
      state.duration = null;
      state.orderSummary = null;
    },

    setIsSubscribed: (state, action) => {
      state.isSubscribed = true;
      state.subscriptionType = action.payload.subscriptionType;
      state.duration = action.payload.duration;
    },

    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      
    },
  },

  extraReducers: (builder) => {
    builder

  
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { product, cartItemId } = action.payload;

        const existing = state.cartItems.find((i) => i._id === product._id);

        if (existing) {
          existing.quantity += 1;
        } else {
          state.cartItems.push({
            ...product,
            quantity: 1,
            cartItemId,
          });
          state.count += 1;
        }

        state.loading = false;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const productId = action.payload.productId;

        state.cartItems = state.cartItems.filter(
          (item) => item._id !== productId
        );

        if (state.count > 0) state.count -= 1;
      })


      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.map((item) => ({
          ...item.product,
          quantity: item.quantity,
          cartItemId: item._id,
        }));

        state.count = state.cartItems.length;
      });
  },
});

export const {
  setCartCount,
  increase,
  decrease,
  increaseQty,
  decreaseQty,
  refreshCartState,
  setCartProductIds,
  setOrderSummary,
  setSubscriptionDetails,
  clearSubscriptionDetails,
  setIsSubscribed,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
