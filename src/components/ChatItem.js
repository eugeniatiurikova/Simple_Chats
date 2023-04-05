import { IconButton, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DeleteOutlined } from "@mui/icons-material";
import { auth } from "../service/firebase";
import { A_UID } from "../utils/constants";

export const ChatItem = ({ chat, onDelete, logged }) => {

  const handleDelete = () => {
    onDelete(chat.id);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton alignItems="flex-start">
        <ListItemText>
          {logged ?
            <NavLink to={`/chats/${chat.id}`}><p className="bodytext">{chat.name}</p></NavLink> :
            <p className="bodytext">{chat.name}</p>}
          <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom><span className="datatext">Created by </span>{chat.author} <span className="datatext">| {chat.time}</span></Typography></ListItemText>
        {logged && <IconButton onClick={handleDelete} edge="end"
          disabled={((auth.currentUser.uid !== chat.userId) & (auth.currentUser.uid !== A_UID)) ? true : false}
        ><DeleteOutlined /></IconButton>}
      </ListItemButton>
    </ListItem>
  );
};

