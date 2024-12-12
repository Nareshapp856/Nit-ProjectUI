import { Snackbar, Alert } from "@mui/material";

const SuccessNotification = ({ open, handleClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal: "right" }} >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessNotification;
