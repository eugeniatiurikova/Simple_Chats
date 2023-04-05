import { ADD_CHAT, DELETE_CHAT, SET_CHATS } from "../actionsTypes";

const initialState = [];

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT:
      return [...state, action.payload];
    case DELETE_CHAT:
      return state.filter((chat) => chat.id !== action.payload);
    case SET_CHATS:
      return action.payload;
    default:
      return state;
  }
};
