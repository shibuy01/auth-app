import useAuth from "@/auth/store";
import { Navigate, Outlet } from "react-router";

function Userlayout() {
  
  const checkLogin = useAuth((state) => state.checkLogin);


  if (checkLogin()) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
}

export default Userlayout;