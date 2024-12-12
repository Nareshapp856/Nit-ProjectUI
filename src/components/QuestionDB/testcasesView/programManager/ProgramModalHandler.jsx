import AddNew from "../../../ui/testView/AddNew";

function ProgramModalHandler({ modalState, modalDispatch, ActionTypes }) {
  const onClose = () => {
    modalDispatch({});
  };

  if (modalState.state === 0) return <AddNew handleClose={onClose} />;

  return null;
}

export default ProgramModalHandler;
