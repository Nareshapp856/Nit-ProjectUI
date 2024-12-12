import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Warnings({ warnings }) {
  const { data: testIdList } = useSelector((store) => store.testListReducer);
  const { data: batchIdList } = useSelector(
    (store) => store.batchDetailsListReducer
  );

  const batchWarnings = useMemo(() => {
    const batchIds = {};

    warnings.bathcIds.notSelected.forEach((id) => {
      const ids = id.split(":");
      const testId = ids[0];
      const batchId = ids[1];
      if (!batchIds[testId]) batchIds[testId] = [];
      batchIds[testId].push(batchId);
    });

    return batchIds;
  }, [warnings.bathcIds]);

  const studentWarnings = useMemo(() => {
    const batchIds = {};

    warnings.emptyBatchIds.emptyBatchIds.forEach((id) => {
      const ids = id.split(":");
      const testId = ids[0];
      const batchId = ids[1];
      if (!batchIds[testId]) batchIds[testId] = [];
      batchIds[testId].push(batchId);
    });

    return batchIds;
  }, [warnings.emptyBatchIds]);

  const getData = useMemo(() => {
    return (obj) => {
      const tests = Object.keys(obj);
      return tests.map((currentTest) => (
        <motion.li
          key={currentTest}
          className="list-inside list-disc"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h5 className="inline-block">
            {
              testIdList.find((ele) => ele.TestID === Number(currentTest))
                ?.TestName
            }
          </h5>
          <ul className="ms-4">
            {obj[currentTest].map((batch) => (
              <motion.li
                key={batch}
                className="list-inside list-[square]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="inline-block">
                  {
                    batchIdList.find((ele) => ele.BatchId === Number(batch))
                      .BatchName
                  }
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.li>
      ));
    };
  }, [warnings.emptyBatchIds]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Please address the following issues before submitting:
      </h2>

      {warnings.testIds?.notSelected?.length > 0 && (
        <div className="bg-gray-200 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Some tests are not selected:
          </h3>
          <ul>
            {warnings.testIds.notSelected.map((id) => (
              <motion.li
                key={id}
                className="list-inside list-disc"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="inline-block">
                  {
                    testIdList.find((ele) => ele.TestID === Number(id))
                      ?.TestName
                  }
                </h4>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {warnings.bathcIds.notSelected?.length > 0 && (
        <div className="bg-gray-200 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Some batches are not selected for tests:
          </h3>
          <ul>{getData(batchWarnings)}</ul>
        </div>
      )}

      {warnings.emptyBatchIds.emptyBatchIds?.length > 0 && (
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">
            Some batches have no students:
          </h3>
          <ul>{getData(studentWarnings)}</ul>
        </div>
      )}
    </div>
  );
}

export default Warnings;
