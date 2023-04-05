import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectIsAuthed } from "../store/selectors";

export const PublicOutlet = () => {
  const isAuthed = useSelector(selectIsAuthed);

  return !isAuthed ? <Outlet /> : <Navigate to="/chats" replace />;
};
