import { onValue, set } from "firebase/database";
import { getMessageRefById, getUserRefByID, msgsRef } from "../../service/firebase";
import { AUTHORS } from "../../utils/constants";
import { ADD_MESSAGE, DELETE_MESSAGE, SET_MESSAGES } from "../actionsTypes";

export const addMessage = (newMessage, chatId) => ({
  type: ADD_MESSAGE,
  payload: {
    message: newMessage,
    chatId,
  },
});

export const deleteMessage = (messageId, chatId) => ({
  type: DELETE_MESSAGE,
  payload: {
    messageId,
    chatId,
  },
});

const setMsgs = (msgs) => ({
  type: SET_MESSAGES,
  payload: msgs,
});


export const initMsgsTracking = () => (dispatch) => {
  onValue(msgsRef, (snapshot) => {
    const newMsgs = {};
    snapshot.forEach((chatMsgsSnap) => {
      newMsgs[chatMsgsSnap.key] = Object.values(
        chatMsgsSnap.val().messageList || {}
      );
    });
    dispatch(setMsgs(newMsgs));
  });
};

export const getUserByID = (usrId) => {
  let usrName = '';
  let usrInfo = '';
  let usrDate = '';
  let usrEmail = '';
  onValue(getUserRefByID(usrId), (snapshot) => {
    usrName += snapshot?.val()?.name;
    usrInfo += snapshot?.val()?.info ? snapshot?.val()?.info : '';
    usrDate += snapshot?.val()?.regdate;
    usrEmail += snapshot?.val()?.email;
  })
  return { usrId, usrName, usrInfo, usrDate, usrEmail }
};

export const addMsgWithFb = (NewMsg, chatId) => () => {
  const newId = `msg${Date.now()}`;
  set(getMessageRefById(chatId, newId), NewMsg)
};

export const deleteMsgWithFb = (id, chatId) => () => {
  set(getMessageRefById(chatId, id), null)
};



// Bot answer

let timeout;
export const addMessageWithReply = (newMessage, chatId) => (dispatch) => {
  dispatch(addMessage(newMessage, chatId));
  clearTimeout(timeout);
  if (newMessage.author !== AUTHORS.BOT) {
    timeout = setTimeout(() => {
      dispatch(
        addMessage(
          {
            text: "Hello! This is the answer from the chatbot.",
            author: AUTHORS.BOT,
            id: `msg-${Date.now()}`,
          },
          chatId
        ));
    }, 2000);
  }
};

