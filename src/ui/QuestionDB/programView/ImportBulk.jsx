import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ImportBulk({ handleClose }) {
  return (
    <Modal open>
      <Box sx={{ ...style, width: 500, height: 200, margin: 0, padding: 0 }}>
        <div style={{ height: "40px", backgroundColor: "#1976d2" }}>
          <div style={{ float: "left" }}>
            <Typography
              style={{
                padding: "5px",
                color: "white",
                marginLeft: "10px",
                fontWeight: "bold",
              }}
            >
              Import SubTopic{" "}
            </Typography>
          </div>
          <div
            style={{ float: "right", padding: "5px", cursor: "pointer" }}
            onClick={handleClose}
          >
            <CloseIcon style={{ backgroundColor: "white" }}></CloseIcon>
          </div>
        </div>
        <div style={{ margin: "10px" }}>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
            }}
            // onChange={(e) => {
            //   const file = e.target.files[0];
            //   setSelectedFile(file);
            // }}
          />
          <Button variant="contained">Import Bulk</Button>

          <a style={{ marginLeft: "5px", color: "blue" }}>Download Template</a>
        </div>
      </Box>
    </Modal>
  );
}

export default ImportBulk;
