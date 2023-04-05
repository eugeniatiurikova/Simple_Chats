import { Box, Button, Card, List, Menu } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { auth } from "../service/firebase";

import { addChatWithFb, deleteChatWithFb } from "../store/chats/actions";
import { selectChats, selectShowName, selectUserName } from "../store/selectors";
import { getDateString } from "../utils/functions";

import { ChatItem } from "./ChatItem";
import { Form } from "./Form";
import { UserInfo } from "./UserInfo";

export const ChatList = () => {
  const chats = useSelector(selectChats);
  const userName = useSelector(selectUserName);
  const showName = useSelector(selectShowName);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(initChatsTracking());
  //   dispatch(initMsgsTracking());
  // }, []);

  const onAddChat = (newChatName) => {
    const newChat = {
      id: `chat${Date.now()}`,
      name: newChatName,
      userId: auth.currentUser.uid,
      author: (showName ? userName : 'Anonymus'),
      time: getDateString()
    };
    dispatch(addChatWithFb(newChat));
  };

  const handleDeleteChat = (id) => {
    dispatch(deleteChatWithFb(id));
  };

  // Form AddChat
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickForm = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const id = open ? 'add_chat' : undefined;
  // Form AddChat

  return (<>
    <div className="content_l">
      <Box component="div" className='messagetext' >
        <div className="buttoncontainer">
          <UserInfo />
          <Button aria-describedby={id} color="inherit" onClick={handleClickForm}>
            Add new chat
          </Button>
        </div>
        <Card sx={{ margin: '20px 0 20px 0', backgroundColor: 'background.paper' }}>
          <List sx={{ margin: '10px 0 10px 0', bgcolor: 'background.paper' }}>
            {chats?.map((chat) => (
              <ChatItem key={chat.id} chat={chat} onDelete={handleDeleteChat} logged />
            ))}
          </List></Card>
      </Box>
    </div>
    <div className="content_r">
      <Box component="div" className='messagetext' >
        <Outlet />
      </Box>
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
        <Form placeholder="New Chat Name" onSubmit={onAddChat} /></div>
    </Menu>
  </>);
};
