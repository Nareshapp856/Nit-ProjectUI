import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  deleteEnrollDispatch,
  fetchEnrollList,
  types,
} from "../../../store/root.actions";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import {
  deleteEnrollItemSlice,
  enrollListSlice,
} from "../../../store/root.slice";
import ConfirmDelete from "../../../ui/EnrollStudent/modal/ConfirmDelete";

function EnrollListRendererComponent({
  enrollList,
  deleteEnrollState,
  //
  deleteEnrollItem,
  fetchEnrollData,
  fetchEnrollListAction,
  resetDeleteEnrollItemState,
  resetEnrollData,
}) {
  const [enrollData, setEnrollData] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState();

  useEffect(() => {
    if (deleteEnrollState === "resolved") {
      resetEnrollData();
      resetDeleteEnrollItemState();
      fetchEnrollData();
    }
  }, [deleteEnrollState]);

  useEffect(() => {
    setEnrollData(enrollList || []);
  }, [enrollList]);

  useEffect(() => {
    fetchEnrollListAction();
  }, []);

  const handleConfirm = () => {
    deleteEnrollItem(showDeleteConfirm);
    setShowDeleteConfirm(false);
  };
  const handleClose = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <ConfirmDelete
        on={showDeleteConfirm}
        data={showDeleteConfirm}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      />

      <div>
        <div className="max-h-[60vh] overflow-y-auto w-4/6 mx-auto border-collapse border border-gray-300">
          <table className="w-full relative">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="border-b border-gray-300">
                <th className="py-3 px-4 text-left">EnrollmentId</th>
                <th className="py-3 px-4 text-left">Batch Count</th>
                <th className="py-3 px-4 text-left">Student Count</th>
                <th className="py-3 px-4 text-left">Test Count</th>
                <th className="py-3 px-4 text-left">Test Name</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollData.map((enrollRecord) => (
                <EnrollRecordRenderer
                  key={enrollRecord.EnrollmentId}
                  enrollRecord={enrollRecord}
                  setShowDeleteConfirm={setShowDeleteConfirm}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const mapStateToRendererProps = (state) => ({
  enrollList: state.enrollListReducer.data,
  deleteEnrollState: state.deleteEnrollReducer.state,
});

const mapDispatchToRendererProps = {
  deleteEnrollItem: deleteEnrollDispatch,
  fetchEnrollListAction: fetchEnrollList,
  fetchEnrollData: () => ({ type: types.ENROLL_LIST }),
  resetEnrollData: enrollListSlice.actions.resetState,
  resetDeleteEnrollItemState: deleteEnrollItemSlice.actions.resetState,
};

const EnrollListRenderer = connect(
  mapStateToRendererProps,
  mapDispatchToRendererProps
)(EnrollListRendererComponent);

export default EnrollListRenderer;

function EnrollRecordRendererComponent({ enrollRecord, setShowDeleteConfirm }) {
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50">
      <td className="py-3 px-4 text-left">{enrollRecord.EnrollmentId}</td>
      <td className="py-3 px-4 text-left">{enrollRecord.No_Of_Batches}</td>
      <td className="py-3 px-4 text-left">{enrollRecord.No_Of_Students}</td>

      <td className="py-3 px-4 text-left">{enrollRecord.No_Of_Tests}</td>
      <td className="py-3 px-4 text-left">{enrollRecord.TestName}</td>
      <td className="py-3 px-4 text-left">
        <IconButton
          sx={{ marginInlineStart: 1.8 }}
          onClick={() => {
            setShowDeleteConfirm(enrollRecord.EnrollmentId);
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}

const mapState = (state) => ({});
const mapDispatch = {};

const EnrollRecordRenderer = connect(
  mapState,
  mapDispatch
)(EnrollRecordRendererComponent);
