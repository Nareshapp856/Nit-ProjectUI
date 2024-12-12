import ApexChart from "../ApexChart";
import Steps from "../Steps";

function TaskContainer() {
  return (
    <>
      <div className="bg-white h-[300px] shadow-[#082F4550] shadow-xl rounded-md sm:p-4">
        <ApexChart />
      </div>

      <div className="bg-white h-[500px] grid place-content-center shadow-[#082F4550] shadow-xl rounded-md p-1 pt-4 sm:p-4 mt-4">
        <Steps />
      </div>
    </>
  );
}

export default TaskContainer;
