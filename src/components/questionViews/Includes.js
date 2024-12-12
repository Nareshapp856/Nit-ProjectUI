import React from "react";

function Includes({ combination }) {
  const combinations = Object.values(combination);

  let included = {};

  let test = Object.values(combination).forEach(
    (ele) => (included[ele.id] = ele.includes)
  );

  return (
    <div>
      <ul>
        <li></li>
      </ul>
    </div>
  );
}

export default Includes;
