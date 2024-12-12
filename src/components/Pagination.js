import React, { useState } from "react";
import { range } from "lodash"; // You can also use lodash for generating an array of numbers

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(false)}
        className="w-40 h-10 mx-2 bg-gray-300"
      >
        previous
      </button>
      <button
        onClick={() => onPageChange(true)}
        className="w-40 h-10 mx-2 bg-gray-300"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
