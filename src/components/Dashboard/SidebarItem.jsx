import { useState } from "react";
import "./Dashboard.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);

  // If the item has children, display them as expandable list
  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div
          className="sidebar-title"
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        >
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          {open ? (
            <KeyboardArrowDownIcon
              onClick={() => setOpen(!open)}
              sx={{ cursor: "pointer" }}
            />
          ) : (
            <KeyboardArrowUpIcon
              onClick={() => setOpen(!open)}
              sx={{ cursor: "pointer" }}
            />
          )}
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    // If no children, just render a simple link
    return (
      <Link to={item.path || "#"} className="sidebar-item plain">
        {item.icon && <i className={item.icon}></i>}
        {item.title}
      </Link>
    );
  }
}
