import { Box, Button, Card, List, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signUp, logIn, auth } from "../service/firebase";
import { setInfoInDB, setName, setEmail, setNameInDB, setRegDateInDB, setShowNameInDB, toggleName, setEmailInDB } from "../store/profile/actions";
import { selectChats } from "../store/selectors";
import { getDateString } from "../utils/functions";
import { ChatItem } from "./ChatItem";

export const Home = ({ isSignUp }) => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [currentName, setCurrentName] = useState("");

  const dispatch = useDispatch();
  const chats = useSelector(selectChats);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(currentEmail, pass);
        dispatch(setNameInDB(currentName));
        dispatch(setEmailInDB(currentEmail));
        dispatch(setShowNameInDB(true));
        dispatch(setRegDateInDB(getDateString()));
        dispatch(setInfoInDB(""));
        dispatch(toggleName(true));
        dispatch(setName(currentName));
        dispatch(setEmail(currentEmail));
      } else {
        await logIn(currentEmail, pass);
        dispatch(setName(auth?.currentUser?.displayName));
        dispatch(setEmail(auth?.currentUser?.email));
      }
    } catch (e) {
      setError(e.message);
    }
    setCurrentEmail("");
    setPass("");
    setError("");
  };

  const onChangeEmail = (e) => {
    setCurrentEmail(e.target.value);
  };

  const onChangePass = (e) => {
    setPass(e.target.value);
  };

  const onChangeCurrentName = (e) => {
    setCurrentName(e.target.value);
  };

  return (<>
    <div className="content_r">
      <Box component="div" className='messagetext' >
        <Typography variant="h5" color="primary">Recent chats</Typography>
        <Card sx={{ margin: '20px 0 20px 0', backgroundColor: 'background.paper' }}>
          <List sx={{ margin: '10px 0 10px 0', bgcolor: 'background.paper' }}>
            {chats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </List></Card>
      </Box>
    </div>
    <div className="content_l">
      <Box component="div" className='messagetext' >
        <div className="buttoncontainer">
          <Typography variant="h5" color="primary">{isSignUp ? "Registration" : "Authorization"}</Typography>
          <Button size="small"><Link to={isSignUp ? "/" : "/signup"}>{!isSignUp ? "Register" : "Sign In"}</Link></Button>
        </div>
        <form onSubmit={handleClick}>
          <TextField type="email" value={currentEmail} onChange={onChangeEmail} placeholder="Email" sx={{ margin: '10px 0 10px 0', backgroundColor: 'background.paper' }} required fullWidth label="Email" />
          <TextField type="password" value={pass} onChange={onChangePass} placeholder="Password" sx={{ margin: '10px 0 10px 0', backgroundColor: 'background.paper' }} required fullWidth label="Password" />
          {isSignUp &&
            <TextField value={currentName} onChange={onChangeCurrentName} placeholder="Your name" sx={{ margin: '10px 0 10px 0', backgroundColor: 'background.paper' }} required fullWidth label="Your name" />
          }
          <Button sx={{ m: '10px 0 10px 0' }} variant="contained" size="large" type='submit'>{isSignUp ? "Sign Up" : "Sign In"}</Button>
        </form>
        {error && <h4>{error}</h4>}
      </Box>
    </div>
  </>);
};
