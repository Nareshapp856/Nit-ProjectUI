import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";

const fetchBatchList = async (payload, setter) => {
  try {
    const res = await axios.get(
      `http://49.207.10.13:4017/api/fetchBatchIdByFacultyId?facultyId=${payload.userId}`
    );
    setter(res.data || []);
  } catch (error) {
    console.error(error);
  }
};

function BatchSelectionComponent({ selectedBatch, onSelect, userId }) {
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    fetchBatchList({ userId }, setBatchData);
  }, [userId]);

  // Remove duplicate batch names
  const uniqueBatchData =
    batchData.length > 0
      ? batchData.reduce((acc, current) => {
          const x = acc.find((batch) => batch.BatchName === current.BatchName);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, [])
      : [];

  return (
    <Grid container mt={4}>
      <Grid
        item
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Autocomplete
            fullWidth
            sx={{ width: 400 }}
            name="batch"
            disablePortal
            value={
              selectedBatch.id
                ? uniqueBatchData.find(
                    (batch) => batch.BatchId === selectedBatch.id
                  )
                : null
            }
            options={uniqueBatchData} //Pass unique batch data
            getOptionLabel={(option) => option.BatchName}
            onChange={(e, newValue) =>
              onSelect(newValue ? newValue.BatchId : null)
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Batch" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapState = (state) => ({
  userId: JSON.parse(localStorage.getItem("auth")).userId,
});

const BatchSelection = connect(mapState)(BatchSelectionComponent);

export default BatchSelection;
