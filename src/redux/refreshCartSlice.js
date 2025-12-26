const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
    refresh: false,
  },
  reducers: {
    increase: (state) => { state.count += 1; },
    decrease: (state) => { state.count -= 1; },
    setCartCount: (state, action) => { state.count = action.payload; },

    refreshCartState: (state) => {
      state.refresh = !state.refresh;  
    }
  }
});

export const { increase, decrease, setCartCount, refreshCartState } = cartSlice.actions;
export default cartSlice.reducer;
