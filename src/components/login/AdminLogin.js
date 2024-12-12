import React, { useContext, useEffect, useRef, useState } from "react";
import AuthCtx from "../../context/auth.context";
import { useNavigate } from "react-router";
import { LocalStorage } from "../../services/LocalStorage";

function UserLogin() {
  const navigate = useNavigate();

  const firstSubmitRef = useRef(true);
  const userNameRef = useRef();
  const passwordRef = useRef();

  const { setIsLoggedIn, setLoginData } = useContext(AuthCtx);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    if (userName) setIsUserNameValid(true);
  }, [userName]);

  useEffect(() => {
    if (password) setIsPasswordValid(true);
  }, [password]);

  function submitHandler() {
    if (isUserNameValid && isPasswordValid) {
      setIsLoggedIn(true);

      LocalStorage.auth = JSON.stringify({
        isLoggedIn: true,
        type: "admin",
        userName: userNameRef.current.value,
      });

      setLoginData({ type: "user", userName: userNameRef.current.value });
      navigate("/dashboard");
    }

    firstSubmitRef.current = false;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-8 rounded-lg">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-1"
          >
            User Name
          </label>
          <input
            id="username"
            type="text"
            name="username"
            ref={userNameRef}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input-field w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={submitHandler}
          className="btn-primary w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserLogin;