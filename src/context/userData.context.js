import { createContext, useState } from "react";
import { UserDataService } from "../pages/UserDataService";
import SHA256 from "crypto-js/sha256";

export const UserDataCtx = createContext(UserDataService);

/**
 * Technology Page Main Api Submit Data
 */
const technologyPage = {
  TestID: 0,
  TechnologyID: -1,
  AssessmentID: 1,
  NatureID: 1,
  RandomID: 1,
  CreatedBy: "Admin",
  ModifiedBy: "Admin",
};

/**
 * Assessment Page Main Api Submit Data
 */
const assessmentPage = {
  TestID: 0,
  TestDetailsID: 0,
  QuestionTypeID: 0,
  NumOfEasy: 0,
  NumOfMedium: 0,
  NumOfHard: 0,
  CreatedBy: "Admin",
  ModifiedBy: "Admin",
};

/**
 * Random ID
 */
const generateUniqueId = (input) => {
  const hash = SHA256(input).toString();
  return hash.substring(0, 10);
};

function UserDataCtxProvider({ children }) {
  const id = generateUniqueId(new Date().toISOString());

  const [userData, setUserData] = useState({
    id,
    technologyPage,
    assessmentPage,
  });

  return (
    <UserDataCtx.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataCtx.Provider>
  );
}

export default UserDataCtxProvider;
