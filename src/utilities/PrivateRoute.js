import React, { useEffect } from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import Login from "../components/Login";


function PrivateRoute({ children, ...rest }) {
   // let auth = useAuth();
   const navigate=useNavigate();
  useEffect(() => {
        navigate("login")
  }, [])
   return <Outlet/>       
}
export default PrivateRoute;