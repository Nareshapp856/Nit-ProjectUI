// Remove Technical Difficulty

import { BarLoader } from "react-spinners";

function LoadingScreen() {
  return (
    <div className="fixed h-[100vh] w-[100vw] grid place-content-center bg-white top-0 left-0 z-50">
      <BarLoader />
    </div>
  );
}

export default LoadingScreen;
