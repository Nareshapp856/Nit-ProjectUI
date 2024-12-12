import React from "react";
import { NavLink } from "react-router-dom";

function UserManagementMainNavigation() {
  return (
    <nav className="bg-[gray] p-[10px]">
      <ul className="flex justify-center h-10 items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white font-medium rounded px-6 py-3"
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-management"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white font-medium rounded px-6 py-3"
            }
            end
          >
            List Of Batches
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-management/batch-details"
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white hover:cursor-not-allowed"
                : "text-white cursor-default font-medium rounded px-6 py-3 hover:cursor-not-allowed"
            }
          >
            Batch Details
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default UserManagementMainNavigation;
