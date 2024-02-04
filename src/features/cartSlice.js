import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    user: "UserLogged",
    updatedAt: new Date().toLocaleString(),
    total: 0,
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const isProductInCart = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!isProductInCart) {
        state.items.push(action.payload);
        const total = state.items.reduce(
          (acc, current) => acc + current.price * current.quantity,
          0
        );
        state.total = total;
        state = {
          ...state,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      } else {
        const itemsUpdated = state.items.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += action.payload.quantity;
            return item;
          }
          return item;
        });
        const total = itemsUpdated.reduce(
          (acc, current) => acc + current.price * current.quantity,
          0
        );
        state.total = total;
        state = {
          ...state,
          items: itemsUpdated,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      }
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload;
      const updatedItems = state.items.filter((item) => item.id !== itemIdToRemove);
      
      const total = updatedItems.reduce(
        (acc, current) => acc + current.price * current.quantity,
        0
      );

      state.total = total;
      state.items = updatedItems;
      state.updatedAt = new Date().toLocaleString();
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.updatedAt = new Date().toLocaleString();
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
