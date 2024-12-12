import { motion } from "framer-motion";
import { useEffect } from "react";

const SuccessSaving = ({ handleClose, savedData = null }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  let message = "Saved data successfully!";

  if (savedData) {
    // Provide a more specific message based on savedData (if available)
    message = `Successfully saved your ${savedData}.`;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-gray-200 rounded-lg shadow-xl p-6 max-w-sm w-80 mx-4"
      >
        <h2 className="text-xl font-bold mb-4">Saved</h2>
        <p className="mb-4">Your Data has been saved successfully!</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
          >
            Continue
          </button>
          {/* Add optional action buttons here (if applicable) */}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessSaving;
