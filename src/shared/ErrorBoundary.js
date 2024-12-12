import React from "react";

function ErrorBoundary() {
  return (
    <div className="text-center mt-8 min-h-screen min-w-full grid place-content-center">
      <h1 className="text-3xl font-bold text-red-500">Something went wrong.</h1>
      <p className="text-lg text-gray-700">
        Please refresh the page or try again later.
      </p>
    </div>
  );
}

export default ErrorBoundary;
