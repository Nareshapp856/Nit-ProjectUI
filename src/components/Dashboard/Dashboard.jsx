import SidebarItem from "./SidebarItem";
import items from "./Data/sidebar.json";
import { Box } from "@mui/material";
import { useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Dashboard.css";

export default function Sidebar() {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate(); // Hook for navigation
  
  // Filter the items based on the user's type
  const filteredItems = useMemo(() => {
    // If userData is missing, return an empty array to avoid errors
    if (!userData) {
      console.error("User data not found in localStorage");
      return [];
    }
    return items.filter((item) => item.title === userData.type);
  }, [userData?.type]); // Use optional chaining to handle undefined `userData`

  // If filteredItems length is less than or equal to zero, navigate to a different page
  useEffect(() => {
    if (filteredItems.length <= 0) {
      // Navigate to a different page if no items match
      navigate("/login"); // Adjust the route path as needed
    }
  }, [filteredItems, navigate]); // Dependency array to re-run the effect when filteredItems change

  // Render the sidebar
  return (
    <Box sx={{ height: "100%" }}>
      <div className="sidebar">
        {/* Ensure filteredItems is not empty before rendering */}
        {filteredItems.length > 0 && filteredItems[0].childrens ? (
          filteredItems[0].childrens.map((item, index) => (
            <div key={index}>
              <SidebarItem item={item} />
            </div>
          ))
        ) : (
          <p>No items found for the selected type.</p>
        )}
      </div>
    </Box>
  );
}
