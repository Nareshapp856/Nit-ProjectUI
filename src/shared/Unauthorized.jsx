import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    setTimeout(()=>{
      navigate("/login")
    },1000)
  },[])
  return (
    <div>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized;
