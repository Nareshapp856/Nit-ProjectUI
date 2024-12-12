import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthCtx from "../context/auth.context";
import Logo from "../assets/Naresh_IT_Logo.png";
import Sidebar from "../components/Dashboard/Dashboard";
import { Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
/**
 *    *** Still Under Developement ***
 *
 *
 * Functional component for the Admin Home Page.
 * @returns {JSX.Element} The Admin Home Page component.
 */
function AdminHomePage() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthCtx);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  return (
    <>
      <header className="p-[0.6rem] bg-[white]">
        <nav>
          <ul className="flex justify-between h-10">
            <li className="grid place-content-center mx-10">
              <img alt="Logo" src={Logo} width={150} />
            </li>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ display: "block", marginRight: "5px" }}>
                <p
                  style={{
                    fontSize: "15px",
                    fontFamily: "sans-serif",
                    fontWeight: "600",
                  }}
                >
                  {userData && userData.userName }
                </p>
                <p style={{ fontSize: "15px" }}>
                  <span style={{ fontWeight: "500" }}>Role:</span>{" "}
                  {userData && userData.type }
                </p>
              </div>
              <Avatar
                alt="User Profile"
                sx={{ width: 40, height: 40, marginTop: "-10px" }}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
              <div
                style={{
                  width: "150px",
                  padding: "10px",
                  boxShadow: "rgba(0,0,0,0.5) 0px 0px 10px",
                  height: "auto",
                  position: "fixed",
                  top: "0%",
                  marginTop: "60px",
                  right: `${!open ? "-100%" : "0%"}`,
                  display: "grid",
                  gridGap: "10px",
                  borderRadius: "5px",
                  zIndex:"1000"
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.removeItem("auth");
                    navigate("/login");
                  }}
                  sx={{ height: "30px" }}
                >
                  LogOut
                </Button>
              </div>
            </div>
          </ul>
        </nav>
      </header>
      <main style={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ width: "100%" }}>
          <Outlet />
        </Box>

        {/* <section className="w-[70%] h-60 mx-auto grid place-content-center text-center mt-20 shadow-2xl">
          <h1 className="text-2xl font-medium p-3">Welcome to Admin Webpage</h1>
          <p className="">This is the Admin to Create for a Test Page</p>
          <aside className="w-[90%] mx-auto">
            <nav>
              <ul className="flex w-full justify-evenly mt-4">
                <li className="text-white  mx-2 bg-sky-400 w-[200px] grid place-content-center h-10 hover:bg-sky-500 rounded-lg">
                  <Link to="/categories/assessmentlist">
                    Test Creation Page
                  </Link>
                </li>
                <li className="text-white mx-2 bg-sky-400 w-[200px] grid place-content-center h-10 hover:bg-sky-500 rounded-lg">
                  <Link
                    onClick={() =>
                      (window.location.href =
                        process.env.REACT_APP_QUESTIONDB_URL)
                    }
                  >
                    Question's DB
                  </Link>
                </li>
                <li className="text-white mx-2 bg-sky-400 w-[200px] grid place-content-center h-10 hover:bg-sky-500 rounded-lg">
                  <Link to="user-management">User Management</Link>
                </li>
                <li className="text-white mx-2 bg-sky-400 w-[200px] grid place-content-center h-10 hover:bg-sky-500 rounded-lg">
                  <Link to="enroll-student">Assign Test</Link>
                </li>
              </ul>
            </nav>
          </aside>
        </section> */}
      </main>
    </>
  );
}

export default AdminHomePage;
