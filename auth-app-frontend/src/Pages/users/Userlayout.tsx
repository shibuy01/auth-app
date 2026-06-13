import useAuth from "@/auth/store";
import { Navigate, Outlet } from "react-router";

function Userlayout() {
  const accessToken = useAuth((state) => state.accessToken);
  const authStatus = useAuth((state) => state.authStatus);
  const checkLogin = useAuth((state) => state.checkLogin);

  console.log("accessToken =", accessToken);
  console.log("authStatus =", authStatus);
  console.log("checkLogin =", checkLogin());

  if (checkLogin()) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
}

export default Userlayout;