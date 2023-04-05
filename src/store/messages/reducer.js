import { ADD_CHAT, ADD_MESSAGE, DELETE_CHAT, SET_MESSAGES } from "../actionsTypes";


const initialState = {};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        [action.payload.chatId]: [
          ...state[action.payload.chatId],
          action.payload.message,
        ],
      };
    case ADD_CHAT:
      return {
        ...state,
        [action.payload.id]: [],
      };
    case DELETE_CHAT: {
      const newMessages = { ...state };
      delete newMessages[action.payload];
      return newMessages;
    }
    case SET_MESSAGES: {
      return action.payload;
    }
    default:
      return state;
  }
};

