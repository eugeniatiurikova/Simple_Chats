import { SET_EMAIL, SET_INFO, SET_NAME, SHOW_NAME, SIGN_IN, SIGN_OUT } from "../actionsTypes";


const initialState = {
  name: "",
  info: "",
  email: "",
  showName: true,
  isAuthed: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NAME:
      return {
        ...state,
        showName: action.payload,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_INFO:
      return {
        ...state,
        info: action.payload,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SIGN_OUT: {
      return { ...state, isAuthed: false };
    }
    case SIGN_IN: {
      return { ...state, isAuthed: true };
    }
    default:
      return state;
  }
};
