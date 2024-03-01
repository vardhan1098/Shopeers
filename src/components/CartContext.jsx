import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  items: [],
};

// Define actions for updating the cart
const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_ITEM: "REMOVE_ITEM", // Add REMOVE_ITEM action type
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Check if the item is already in the cart
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If the item already exists, update its quantity
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If the item is not in the cart, add it
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case actionTypes.REMOVE_ITEM:
      // Find the item in the cart
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload.itemId
      );

      if (itemToRemove) {
        // If the item exists, decrement its quantity
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        // Filter out items with quantity greater than zero
        const filteredItems = updatedItems.filter((item) => item.quantity > 0);

        return {
          ...state,
          items: filteredItems,
        };
      }

      return state;

    default:
      return state;
  }
};

// Create the CartContext
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap the app and provide the context
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // When adding an item to the cart
  const addToCart = (item) => {
    const itemWithQuantity = {
      ...item,
      quantity: 1, // Set a default quantity (you can adjust this as needed)
    };
    dispatch({ type: actionTypes.ADD_TO_CART, payload: itemWithQuantity });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: actionTypes.REMOVE_ITEM, payload: { itemId } });
  };

  const contextValue = {
    cartState,
    addToCart,
    removeFromCart, // Add removeFromCart to context value
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
