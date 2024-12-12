import React, {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CourseCurriculumFlagContext = createContext({
  useMasterDB: false,
});

export const useCourseCurriculumFeatureFlags = () =>
  useContext(CourseCurriculumFlagContext);

export const CourseCurriculumFlagProvider = ({ children }) => {
  const [flags, setFlags] = useState({
    useMasterDB: false,
  });

  const setFlag = (type, flag) => {
    setFlags((prev) => ({ ...prev, [type]: flag }));
  };

  return (
    <CourseCurriculumFlagContext.Provider value={[flags, setFlag]}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </CourseCurriculumFlagContext.Provider>
  );
};
