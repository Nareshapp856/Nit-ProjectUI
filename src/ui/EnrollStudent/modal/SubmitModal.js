import { Button } from "@mui/material";

function SubmitModal() {
  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-8">
        <div className="mb-6">
          <p className="text-lg font-semibold text-center">
            Test Added Successfully. Would you like to continue to the next
            page?
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            variant="outlined"
            color="error"
            className="px-6 py-2 text-sm font-medium border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="px-6 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SubmitModal;
