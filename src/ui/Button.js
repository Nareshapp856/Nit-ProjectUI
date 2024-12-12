import React from "react";
import { Link } from "react-router-dom";

function Button({ disabled, link }) {
  return (
    <div className="w-full flex mt-14">
      <Link
        onClick={(e) => {
          if (disabled) e.preventDefault();
        }}
        to={link}
        className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
      >
        Next
      </Link>
    </div>
  );
}

export default Button;
