import { onAuthStateChanged, updateEmail, updateProfile } from "@firebase/auth";
import { onValue, set } from "@firebase/database";
import { auth, getUserEmailRefByID, getUserInfoRefByID, getUserNameRefByID, getUserRegDateRefByID, getUserShowNameRefByID } from "../../service/firebase";
import { SHOW_NAME, SET_NAME, SIGN_IN, SIGN_OUT, SET_INFO, SET_EMAIL } from "../actionsTypes";

export const toggleName = (value) => ({
  type: SHOW_NAME,
  payload: value,
});

export const setName = (newName) => ({
  type: SET_NAME,
  payload: newName,
});

export const setInfo = (newInfo) => ({
  type: SET_INFO,
  payload: newInfo,
});

export const setEmail = (newEmail) => ({
  type: SET_EMAIL,
  payload: newEmail,
});

export const signIn = () => ({
  type: SIGN_IN,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

// FIREBASE

export const initAuthTracking = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(signIn());
    } else {
      dispatch(signOut());
    }
  });
};

export const initUserData = () => (dispatch) => {
  onValue(getUserNameRefByID(auth?.currentUser.uid), (snapshot) => {
    const userName = snapshot?.val();
    dispatch(setName(userName));
  });

  onValue(getUserShowNameRefByID(auth.currentUser.uid), (snapshot) => {
    const userShowName = snapshot?.val();
    dispatch(toggleName(userShowName));
  });

  onValue(getUserInfoRefByID(auth.currentUser.uid), (snapshot) => {
    const userInfo = snapshot?.val();
    dispatch(setInfo(userInfo));
  });

  dispatch(setEmail(auth.currentUser.email));
  console.log('InitUserData')
};

export const setNameInDB = (newName) => () => {
  set(getUserNameRefByID(auth.currentUser.uid), newName);
  updateProfile(auth.currentUser, { displayName: newName })
};

export const setInfoInDB = (newInfo) => () => {
  set(getUserInfoRefByID(auth.currentUser.uid), newInfo);
};

export const setRegDateInDB = (newDate) => () => {
  set(getUserRegDateRefByID(auth.currentUser.uid), newDate);
};

export const setEmailInDB = (newEmail) => () => {
  set(getUserEmailRefByID(auth.currentUser.uid), newEmail);
  if (auth.currentUser.email !== newEmail) updateEmail(auth.currentUser, newEmail);
};

export const setShowNameInDB = (newValue) => () => {
  set(getUserShowNameRefByID(auth.currentUser.uid), newValue);
};