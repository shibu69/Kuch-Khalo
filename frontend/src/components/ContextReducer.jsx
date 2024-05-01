import React, { useReducer, useContext, createContext } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
          img: action.img,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "UPDATE":
      return state.map(food => {
        if (food.id === action.id) {
          return {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: parseInt(action.price) + food.price,
          };
        }
        return food;
      });
    case "DROP":
      return []; // Initialize the cart as an empty array when dropping
    default:
      console.log("Error in reducer");
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(cartStateContext) || []; // Ensure the default value is an empty array if context is not provided
export const useDispatchCart = () => useContext(cartDispatchContext);