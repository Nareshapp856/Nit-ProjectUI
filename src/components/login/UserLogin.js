import React, { useContext, useEffect, useRef, useState } from "react";
import AuthCtx from "../../context/auth.context";
import { useLocation, useNavigate } from "react-router";
import { LocalStorage } from "../../services/LocalStorage";
import api from "../../services/api";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import MUI icons

function UserLogin() {
  // Auth
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const firstSubmitRef = useRef(true);
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { setIsLoggedIn, setLoginData } = useContext(AuthCtx);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    if (userName) setIsUserNameValid(true);
  }, [userName]);

  useEffect(() => {
    if (email) setIsEmailValid(true);
  }, [email]);

  useEffect(() => {
    if (password) setIsPasswordValid(true);
  }, [password]);

  async function submitHandler() {
    if (isEmailValid && isPasswordValid) {
      if (email === "superadmin@gmail.com" && password === "Nit@12345") {
        LocalStorage.auth = JSON.stringify({
          isLoggedIn: true,
          type: "superadmin",
          userId: 0,
          userName: "superuser@gmail.com",
          email: "superuser@gmail.com",
        });
        return navigate("/");
      }
      try {
        const res = await axios.post(
          "http://49.207.10.13:6013/api/nit_v1/AuthenticateStudent",
          {
            UserName: email,
            Password: password,
          }
        );
        console.log(res.data);
        if (res?.data?.IsAuthenticated) {
          setIsLoggedIn(true);

          setLoginData({
            type: "user",
            email: emailRef.current.value,
          });
          LocalStorage.auth = JSON.stringify({
            isLoggedIn: true,
            type: res.data.role,
            userId: res.data.UserID,
            userName: res.data.UserName,
            email: emailRef.current.value,
          });
          setLoginError(res.data.Message || "");
          if (page) navigate(page);
          else navigate("/");
        }
        setLoginError(res.data.Message);
      } catch (error) {
        console.log(error);
        setLoginError(error);
      }
    }

    firstSubmitRef.current = false;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-8 rounded-lg">
        <h1 style={{ fontSize: "25px", textAlign: "center" }}>
          <b>Login</b>
        </h1>
        {loginError && (
          <p style={{ color: "red", fontSize: "16px" }}>
            {loginError.message || loginError}
          </p>
        )}
        <div className="mt-15" style={{ marginTop: "30px" }}>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field w-[20rem] px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mt-15" style={{ marginTop: "15px" }}>
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
              name="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsPasswordVisible((prev) => !prev)} // Toggle visibility
            >
              {isPasswordVisible ? <Visibility /> : <VisibilityOff />}{" "}
              {/* MUI icons for password visibility */}
            </span>
          </div>
        </div>
        <button
          style={{ marginTop: "40px" }}
          onClick={submitHandler}
          className="btn-primary w-full py-2 mt-30 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserLogin;
