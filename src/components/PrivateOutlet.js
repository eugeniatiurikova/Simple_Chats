import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectIsAuthed } from "../store/selectors";

export const PrivateOutlet = () => {
  const isAuthed = useSelector(selectIsAuthed);

  return isAuthed ? <Outlet /> : <Navigate to="/" replace />;
};
