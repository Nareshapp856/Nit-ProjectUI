import React, { useContext, useEffect } from "react";
import ExcelImport from "../components/ExcelImport";
import { useNavigate } from "react-router";
import AuthCtx from "../context/auth.context";

function UploadTopic() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

  return <ExcelImport />;
}

export default UploadTopic;
