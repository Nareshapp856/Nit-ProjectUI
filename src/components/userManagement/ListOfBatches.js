import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { fetchBatchList } from "../../store/root.actions";
import BatchTableRenderer from "./ListOfBatches/BatchTableRenderer";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import userManagementSlice from "../../store/slice/userManagement.slice";

// styles
const cellStyle = {
  fontFamily: "Roboto",
  fontSize: "14px",
  color: "#636363",
  fontStyle: "normal",
};
const tableHeight = "500px";
const tableWidth = "100%";

function ListOfBatchesComponent({
  data,
  isLoading,
  isError,
  dispatchBatchList,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userManagementSlice.actions.resetData());
    dispatchBatchList();
  }, [dispatchBatchList]);

  const clickHanlder = () => {
    dispatch(userManagementSlice.actions.resetData());
  };

  return (
    <div
      className="flex flex-col justify-center gap-y-8"
      style={{ paddingLeft: "10px", paddingRight: "10px" }}
    >
      <div>
        <Button onClick={clickHanlder} variant="contained">
          <NavLink to="/user-management/batch-details/0">Create New</NavLink>
        </Button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Loading...</div>
      ) : (
        <div>
          <BatchTableRenderer
            batchList={data}
            cellStyle={cellStyle}
            height={tableHeight}
            width={tableWidth}
          />
        </div>
      )}
    </div>
  );
}

const mapBatchListState = (state) => ({
  data: state.batchListReducer.data,
  isLoading: state.batchListReducer.isLoading,
  isError: state.batchListReducer.isError,
});

const mapDispatch = {
  dispatchBatchList: fetchBatchList,
};

const ListOfBatches = connect(
  mapBatchListState,
  mapDispatch
)(ListOfBatchesComponent);

export default ListOfBatches;
