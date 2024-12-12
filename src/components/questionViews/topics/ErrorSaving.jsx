import { motion } from "framer-motion";
import { useEffect } from "react";

const ErrorSaving = ({ handleRetry, handleClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75"
      />
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="relative bg-gray-200 rounded-lg shadow-xl p-6 max-w-sm w-80 mx-4 z-50"
      >
        <h2 className="text-xl font-bold mb-4">Couldn't save</h2>
        <p className="mb-4">Error saving data. Would you like to retry?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              handleRetry();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ErrorSaving;
