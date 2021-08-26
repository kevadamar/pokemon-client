import { createContext, useReducer } from 'react';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  token: '',
  user: {
    fullname: '',
    email: '',
  },
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload.user,

        isLogin: true,
      };

    case LOGOUT:
      return {
        ...state,
        user: {
          fullname: '',
          email: '',
        },
        isLogin: false,
      };
    default:
      throw new Error('case unknown');
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
