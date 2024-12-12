import BatchTable from "../../components/enrollStudent/BatchTable/BatchTable";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigation, useParams } from "react-router";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatchList } from "../../store/root.actions";
import { resetEnrollStudentDetailsSlice } from "../../store/slice/enrollStudent.slice";
import api from "../../services/api";

function BatchTablePage() {
  const [batchData, setBatchData] = useState([]);
  const [testIdArr, setTestIdArr] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const { testIdList } = useSelector((store) => store.enrollStudentReducer);
  const batchList = useSelector((store) => store.batchListReducer);
  const [error, setError] = useState({
    isError: false,
    message: "",
    local: true,
    action: () => {
      navigate("/enroll-student/");
    },
  });

  const fetch = async () => {
    const res = await api.post("/GetBatchIdsByTestids", {
      TestIdList: testIdList?.join(","),
    });
    setTestIdArr(Object.keys(res.data.dbresult));
    setBatchData(Object.values(res.data.dbresult));
  };

  useEffect(() => {
    dispatch(resetEnrollStudentDetailsSlice());
  }, []);

  useEffect(() => {
    fetch();
  }, [testIdList]);

  const onBatchSelect = (e, selectedBatch_Id) => {
    if (!e.target.checked) {
      if (selectedBatches.includes(selectedBatch_Id)) {
        const index = selectedBatches.indexOf(selectedBatch_Id);
        if (index !== -1) {
          const updatedselectedBatches = [...selectedBatches];
          updatedselectedBatches.splice(index, 1);
          setSelectedBatches(updatedselectedBatches);
        }
      }
    } else {
      if (e.target.checked) {
        setSelectedBatches((prev) => {
          const updatedselectedTests = [...prev];
          updatedselectedTests.push(selectedBatch_Id);
          return updatedselectedTests;
        });
      }
    }
  };

  return (
    <>
      {/*  */}
      <header className="bg-gray-100 max-w-full overflow-hidden">
        <EnrollStudentNavigation />
      </header>

      <main className="text-black mt-8">
        batchList
        <div>
          <div>
            {batchData.length > 0
              ? batchData.map((batchElement, index) => (
                  <div>
                    <p>{testIdArr[index]}</p>
                    <BatchTable
                      batchData={batchElement}
                      onBatchSelect={onBatchSelect}
                    />
                  </div>
                ))
              : 0}
          </div>
        </div>
        <div className="mt-10 mx-auto w-4/6">
          <span className="ms-[9%]">
            <Button variant="outlined" color="inherit">
              Submit
            </Button>
          </span>
        </div>
      </main>

      {/*  */}
      <footer className="grid place-content-center p-6 w-full max-w-full overflow-hidden fixed bottom-0">
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default BatchTablePage;
