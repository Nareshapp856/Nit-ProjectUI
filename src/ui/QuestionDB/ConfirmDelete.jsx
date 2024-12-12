import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function ConfirmDelete({
  open,
  message,
  handleConfirm,
  handleCancel,
  handleClose,
}) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm Delete</DialogTitle>

      <DialogContent>{message}</DialogContent>

      <DialogActions>
        <Button onClick={handleCancel} variant="contained">
          cancel
        </Button>

        <Button onClick={handleConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDelete;
