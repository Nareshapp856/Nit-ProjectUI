import { Modal } from "@mui/material";
import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function ModalUi({
  ModalParam,
  flag,
  modalData,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.38 } }}
      onClick={() => modalCancelHandler(false)}
      className="backdrop"
    >
      <div
        className="modal"
        onClick={(e) => {
          modalCancelHandler(false);
        }}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {
            <ModalParam
              flag={flag}
              modalData={modalData}
              modalSubmitHandler={modalSubmitHandler}
              modalCancelHandler={modalCancelHandler}
            />
          }
        </div>
      </div>
    </motion.div>,
    document.getElementById("modal")
  );
}

export default ModalUi;
