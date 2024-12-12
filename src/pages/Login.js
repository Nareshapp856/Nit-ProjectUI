import brand_logo from "../assets/Naresh_IT_Logo.png";
import { Outlet,useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate=useNavigate();
  const userData= JSON.parse(localStorage.getItem("auth"));

  useEffect(()=>{
    if( userData && userData.type !== 'student'){
      console.log(userData);
      navigate("/");
    }
  },[userData])

  return (
    <>
      <header className="m-3 fixed">
        <img src={brand_logo} width={260} alt="logo" />
      </header>

      <div className="min-h-screen min-w-full bg-gradient-to-r from-blue-800 via-white to-white opacity-[.41] fixed top-0 left-0 -z-10">
        <div className="min-h-screen min-w-full bg-gradient-to-b from-white via-white to-blue-800 opacity-60">
          <div className="min-h-screen min-w-full bg-gradient-to-t from-blue-800 viawhite to-blue-800 opacity-70"></div>
        </div>
      </div>

      <main className="min-h-screen min-w-full grid place-content-center">
        <div className="w-[480px] h-[460px]  rounded shadow-lg shadow-[#af1e1e16] bg-opacity-100">
          <div className="w-auto h-full bg-white rounded shadow shadow-[#1e40af2a] bg-opacity-[.89]">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
