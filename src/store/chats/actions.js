import { onValue, set } from "@firebase/database";
import {
  chatsRef,
  getChatRefById,
  getMsgsRefById,
} from "../../service/firebase";
import { ADD_CHAT, DELETE_CHAT, SET_CHATS } from "../actionsTypes";

export const addChat = (newChat) => ({
  type: ADD_CHAT,
  payload: newChat,
});

export const deleteChat = (chatId) => ({
  type: DELETE_CHAT,
  payload: chatId,
});

const setChats = (chats) => ({
  type: SET_CHATS,
  payload: chats,
});

export const initChatsTracking = () => (dispatch) => {
  onValue(chatsRef, (snapshot) => {
    const newChats = [];

    snapshot?.forEach((chat) => {
      newChats.push(chat.val());
    });

    dispatch(setChats(newChats.reverse()));
  });
};

export const addChatWithFb = (newChat) => () => {
  //нужен обработчик ошибки
  set(getChatRefById(newChat.id), newChat);
  set(getMsgsRefById(newChat.id), { init: newChat.id });
};

export const deleteChatWithFb = (id) => () => {
  //нужен обработчик ошибки
  set(getMsgsRefById(id), null);
  set(getChatRefById(id), null);
};