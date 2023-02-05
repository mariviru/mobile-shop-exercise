import { createContext, useContext, useReducer } from 'react';
import { SET_DETAIL_DATA, SET_INDEX_DATA, SET_SHOPPING_CART_QUANTITY } from '../assets/constants';

const initialState = {
  indexData: [],
  detailData: {},
  shoppingCartQuantity: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_INDEX_DATA:
      return {
        ...state,
        indexData: action.payload,
      }

    case SET_DETAIL_DATA:
      return {
        ...state,
        detailData: action.payload,
      }

    case SET_SHOPPING_CART_QUANTITY:
      return {
        ...state,
        shoppingCartQuantity: action.payload,
    }

    default:
      throw new Error(`Unhandled action: ${action}`);
  }
};

const Context = createContext();

const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {state, dispatch};

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

function DataContext() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('DataContext must be used within a ContextProvider');
  }

  const { state, dispatch } = context;

  return {
    ...state,
    dispatch,
  };
}

export { Context, ContextProvider, DataContext };

