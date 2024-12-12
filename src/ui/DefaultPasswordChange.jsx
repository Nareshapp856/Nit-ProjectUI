import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import brand_logo from "../assets/Naresh_IT_Logo.png";
import OTPPage from "./OTPVerification";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PasswordChangeForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const userid = queryParams.get("userid");
  const type = queryParams.get("type");

  console.log("userid:", userid, "type:", type);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [isdefaultPassword, setDefaultPasswordChange] = useState(true);
  const [ispasswordChange, setPasswordChange] = useState(false);
  const [isforgotPassword, setForgotPasswordChange] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  // Handler for form submission
  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (newPassword === oldPassword) {
      setError("New password not equal to old Password");
    }
    if (newPassword === "" || oldPassword === "") {
      setError("Please fill in all fields.");
      return;
    }
    // Proceed with password change logic (e.g., API call)
    const res = await axios.put(
      "http://49.207.10.13:4017/apinit/verifyPassword",
      {
        defaultPassword: oldPassword,
        newPassword: newPassword,
        userId: userid,
        type: type,
      }
    );
    if (res.data.success) {
      setMessage("successfully updated password");
      setSeverity("success");
      setOpen(true);
      setError("");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit1 = () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (newPassword === "") {
      setError("Please fill in all fields.");
      return;
    }
    // Proceed with password change logic (e.g., API call)
    setError("");
    alert("Password changed successfully!");
  };

  return (
    <>
      <header style={{ position: "fixed", margin: "10px" }}>
        <img src={brand_logo} width={260} alt="logo" />
      </header>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        {ispasswordChange && (
          <>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter New Password"
                  type={showNewPassword ? "text" : "password"}
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit1}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </>
        )}

        {isdefaultPassword && (
          <>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter Old Password"
                  type={showOldPassword ? "text" : "password"}
                  variant="outlined"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          edge="end"
                        >
                          {showOldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter New Password"
                  type={showNewPassword ? "text" : "password"}
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </>
        )}

        {isforgotPassword && <OTPPage />}
        <Snackbar
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3000} // Auto hide after 3 seconds
        >
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default PasswordChangeForm;
