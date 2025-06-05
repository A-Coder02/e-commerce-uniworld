import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // array of { id, name, price, quantity, image }
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload; // {id, name, price, image}
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
      }

      // Calculate totalAmount
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.items = state.items.filter((item) => item.id !== id);

      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },

    decreaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalQuantity--;
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      } else if (existingItem && existingItem.quantity === 1) {
        // Remove item if quantity reaches zero
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity--;
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
