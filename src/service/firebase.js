import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth
} from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDa_EMac8vyhSJRR4tNd6s3srtbmX3trNI",
  authDomain: "react-chats-lesson9.firebaseapp.com",
  databaseURL: "https://react-chats-lesson9-default-rtdb.firebaseio.com",
  projectId: "react-chats-lesson9",
  storageBucket: "react-chats-lesson9.appspot.com",
  messagingSenderId: "455674047647",
  appId: "1:455674047647:web:ec5f597e5297afa8b5c6aa"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export const signUp = async (email, pass) => {
  await createUserWithEmailAndPassword(auth, email, pass);
};
export const logIn = async (email, pass) => {
  await signInWithEmailAndPassword(auth, email, pass);
};

export const logOut = async () => {
  await signOut(auth);
};


export const usersRef = ref(db, "users");
export const getUserRefByID = (id) => ref(db, `users/${id}`);
export const getUserNameRefByID = (id) => ref(db, `users/${id}/name`);
export const getUserEmailRefByID = (id) => ref(db, `users/${id}/email`);
export const getUserRegDateRefByID = (id) => ref(db, `users/${id}/regdate`);
export const getUserShowNameRefByID = (id) => ref(db, `users/${id}/showName`);
export const getUserInfoRefByID = (id) => ref(db, `users/${id}/info`);
export const getUserIDRefByID = (id) => ref(db, `users/${id}/userId`);

export const chatsRef = ref(db, "chats");
export const getChatRefById = (id) => ref(db, `chats/${id}`);
export const getMsgsRefById = (chatId) => ref(db, `messages/${chatId}`);

export const msgsRef = ref(db, "messages");
export const getMsgsListRefById = (chatId) => ref(db, `messages/${chatId}/messageList`);
export const getMessageRefById = (chatId, msgid) => ref(db, `messages/${chatId}/messageList/${msgid}`);
