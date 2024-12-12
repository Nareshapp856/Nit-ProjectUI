import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <nav className="bg-[gray] p-[10px]">
      <ul className="flex justify-center h-10 items-center">
        <li className="">
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
        <li className="">
          <NavLink
            to="assessmentlist"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white font-medium rounded px-6 py-3"
            }
            end
          >
            List Of Assessment
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="technology"
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
            }
            end
          >
            Technology
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="assessments"
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
            }
            end
          >
            Assessment
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="questionview"
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
            }
            end
          >
            Question Views
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="scheduletime"
            onClick={(e) => e.preventDefault()}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-500 font-medium rounded px-6 py-3 text-white"
                : "text-white cursor-default font-medium rounded px-6 py-3"
            }
            end
          >
            ScheduleTime
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
