import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function ConfirmDelete({ on, data, handleConfirm, handleClose }) {
  return (
    <Dialog open={on} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm Delete</DialogTitle>

      <DialogContent>Sure you want to delete this enrollment</DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          cancel
        </Button>

        <Button
          onClick={() => handleConfirm(data)}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDelete;
