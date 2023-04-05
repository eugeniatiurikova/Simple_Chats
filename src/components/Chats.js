import React, { useMemo, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "./Form";
import { addMsgWithFb, deleteMsgWithFb } from "../store/messages/actions";
import {
  selectChats,
  selectMessagesByChatId, selectShowName, selectUserName,
} from "../store/selectors";
import { Message } from "./Message";
import { auth } from "../service/firebase";
import { Box, Button, Menu, Typography } from "@mui/material";



function Chats() {
  const { chatId } = useParams();
  const userName = useSelector(selectUserName);
  const showName = useSelector(selectShowName);

  const getMessagesByChatId = useMemo(
    () => selectMessagesByChatId(chatId),
    [chatId]
  );

  const messagesUnsorted = useSelector(getMessagesByChatId);

  const messagesForCurrentChat = (msgs) => {
    let tmp = [];
    msgs?.forEach(id => tmp.unshift(id))
    return tmp;
  }

  const currentChat = useSelector(selectChats).filter((item) => item.id === chatId)[0];
  const dispatch = useDispatch();

  const onAddMessage = (newMessage, chatId) => {
    dispatch(addMsgWithFb(newMessage, chatId));
  };

  const handleSubmit = (text) => {
    const tmpdate = new Date();
    const month = tmpdate.getMonth() + 1;
    const datestr = tmpdate.getDate() + '.' + (month < 10 ? '0' : '') + month + '.' + tmpdate.getFullYear() + ' ' + tmpdate.getHours() + ':' + tmpdate.getMinutes();
    const newMessage = {
      text,
      author: (showName ? userName : 'Anonymus'),
      userId: auth.currentUser.uid,
      id: `msg${Date.now()}`,
      time: datestr
    };
    onAddMessage(newMessage, chatId);
  };

  const handleDeleteMessage = (id) => {
    dispatch(deleteMsgWithFb(id, chatId));
  };

  // Form AddMessage
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickForm = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const id = open ? 'add_message' : undefined;
  // Form AddMessage

  if (currentChat) {
    return (<>
      <div className="buttoncontainer">
        <Box sx={{ display: 'flex', gap: '18px' }}>
          <Typography variant="body1"><span className="datatext">{currentChat?.name}</span></Typography></Box>
        <Button aria-describedby={id} color="inherit" onClick={handleClickForm}>
          Add&nbsp;new&nbsp;message
        </Button>
      </div>
      <div>
        {messagesForCurrentChat(messagesUnsorted).map((message) => (
          <Message key={message.id} message={message} onDelete={handleDeleteMessage} />
        ))}
      </div>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className='popupform'>
          <Form placeholder="New message text" buttontext="Add message" focusOnChange={chatId} onSubmit={handleSubmit} multiline />
        </div>
      </Menu>
    </>)
  } else return (<></>);
}

export default Chats;
