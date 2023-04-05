import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initAuthTracking, setName, signOut } from "../store/profile/actions";

import { ChatList } from "./ChatList";
import { Placeholder } from "./Placeholder";
import Chats from "./Chats";
import { Home } from "./Home";
import { PrivateOutlet } from "./PrivateOutlet";
import Profile from "./Profile";
import { PublicOutlet } from "./PublicOutlet";
import { initChatsTracking } from "../store/chats/actions";
import { initMsgsTracking } from "../store/messages/actions";
import { logOut } from "../service/firebase";

export const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    logOut();
    dispatch(setName(''));
    dispatch(signOut());

    dispatch(initAuthTracking());

    dispatch(initChatsTracking());
    dispatch(initMsgsTracking());

  }, []);


  return (
    <BrowserRouter>
      <div className="container">
        <div className="wrap">
          <Routes>
            <Route path="/" element={<PublicOutlet />}>
              <Route path="" element={<Home />} />
              <Route path="signup" element={<Home isSignUp />} />
            </Route>
            <Route path="/chats" element={<PrivateOutlet />}>
              <Route path="" element={<ChatList />}>
                <Route path="" index element={<Placeholder text="Select chat or&nbsp;create your new chat" />} />
                <Route path=":chatId" element={<Chats />} />
              </Route>
            </Route>
            <Route path="/profile" element={<PrivateOutlet />}>
              <Route path="" element={<Profile />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};