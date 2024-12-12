import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router"
import AuthCtx from "../context/auth.context";

function EnrollStudentPage(){
  
    const navigate = useNavigate();

    const { isLoggedIn } = useContext(AuthCtx);
    useEffect(() => {
      if (!isLoggedIn) navigate("/login?page=categories/assessmentlist");
    }, [isLoggedIn, navigate]);

    return <Outlet />
    
}

export default EnrollStudentPage