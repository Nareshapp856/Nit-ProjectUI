import React from "react";
import * as XLSX from "xlsx";
import { Button, Stack, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

export default function FileUpload({
  tableData,
  setTableData,
  setDisableEdit,
}) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const currentListLength = tableData.length;
      const transformedData = data.slice(1).map((row, index) => ({
        sessionNumber: index + currentListLength,
        topics: row[1],
        subTopics: row[2]?.split(", ") || [],
      }));

      if (tableData && tableData[0]?.first) setTableData(transformedData);
      else
        setTableData((prev) => {
          const newArr = [...prev, ...transformedData];
          newArr[0].first = false;
          return newArr;
        });

      setMessage("File uploaded successfully");
      setOpen(true);
    };

    if (file) {
      reader.readAsBinaryString(file);
    } else {
      setMessage("No file selected");
      setOpen(true);
    }
    setDisableEdit(true);
    // Reset the input value to allow the same file to be uploaded again
    e.target.value = "";
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ mb: 2 }}>
      <label htmlFor="file-upload">
        <Input
          id="file-upload"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
        />
        <Button
          variant="contained"
          color="secondary"
          component="span"
          size="large"
          sx={{
            textTransform: "none",
            backgroundColor: "#4caf50",
            "&:hover": {
              backgroundColor: "#388e3c",
            },
          }}
        >
          Upload File
        </Button>
      </label>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.includes("error") ? "error" : "success"}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
