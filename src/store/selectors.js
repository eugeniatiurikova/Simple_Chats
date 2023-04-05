
//Profile
export const selectUserName = (state) => state.profile.name;
export const selectShowName = (state) => state.profile.showName;
export const selectIsAuthed = (state) => state.profile.isAuthed;

//Messages
export const selectMessages = (state) => state.messages;
export const selectMessagesByChatId = (chatId) => (state) =>
    state.messages[chatId];

//Chats
export const selectChats = (state) => state.chats;
