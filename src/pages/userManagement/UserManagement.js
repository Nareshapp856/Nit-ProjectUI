import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import UserManagementMainNavigation from "../../ui/UserManagement/UserManagementMainNavigation";
import UserManagementFooter from "../../ui/UserManagement/UserManagementFooter";
import Logo from "../../ui/Logo";
import AuthCtx from "../../context/auth.context";

function UserManagement() {
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(AuthCtx);
  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=categories/assessmentlist");
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header>
        {/* <Logo /> */}
        {/* <UserManagementMainNavigation /> */}
      </header>
      <main className="flex-grow mt-8 container mx-auto">
        <Outlet />
      </main>
      <footer className="p-6">{/* <UserManagementFooter /> */}</footer>
    </div>
  );
}

export default UserManagement;
