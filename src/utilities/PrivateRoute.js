import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import Login from "../components/Login";


function PrivateRoute({ children, ...rest }) {
   const user =useSelector(state=>state.user)
   console.log(user)
  const navigate=useNavigate();
  if(user.data.username===undefined){
    navigate("login")
  }
  useEffect(() => {
    if(user.data.username===undefined)
      navigate("login")
  }, [])
   return <Outlet/>       
}
export default PrivateRoute;