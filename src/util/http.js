import { QueryClient } from "@tanstack/react-query";
// import axios from "axios";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
import api from "../services/api";

export const queryClient = new QueryClient();

export const getAllAssessments = async () => {
  try {
    const res = await api.get("/getAllTests");
    return { assessments: res.data };
  } catch (err) {
    return { assessments: [] };
  }
};

export const getProgLangs = async () => {
  const res = await api.get("/fetchTechnologies");

  return { programmingLanguages: res.data };
};

export const getModuleNames = async (id) => {
  try {
    const res = await api.get(`/fetchModules/${id}`);
    const data = { moduleNames: res.data };
    return data;
  } catch (err) {}
};

export const getTopicNames = async () => {
  try {
    const res = await api.get(
      `/FetchTopics/${LocalStorage.getModuleDataById()}`
    );

    const data = res.data;
    return data;
  } catch (err) {}
};

export const getSubTopicNames = async () => {
  try {
    if (LocalStorage._getTopicDataById()) {
      const res = await api.get(
        `/FetchSubTopics/${LocalStorage._getTopicDataById()}`
      );

      const data = res.data;

      return data;
    }
    return 1;
  } catch (err) {}
};

export const getQuestions = async (easy, medium, hard) => {
  try {
    const res = await api.get(
      `/fetchDynamicQuestions/?McqAll=${
        LocalStorage.exclude.length
      }&Hardcount=${BuilderService.getHard()}&MediumCount=${BuilderService.getMedium()}&EasyCount=${BuilderService.getEasy()}`
    );

    const data = res.data;

    return data;
  } catch (err) {}
};

export const getBatchWarn = (
  setter,
  testIdList,
  batchIdList,
  includedStudents
) => {
  try {
    const testIdFromBatch = [];

    const batchIds = [];
    const batchIdFromStu = [];

    const testIdWarn = [];
    const batchIdWarn = [];
    const emptyBatchIds = [];

    for (let key in batchIdList) {
      batchIdList[key].map((ele) => batchIds.push(key + ":" + ele));
      testIdFromBatch.push(key);
    }

    for (let test in includedStudents) {
      Object.keys(includedStudents[test]).forEach((ele) =>
        batchIdFromStu.push(test + ":" + ele)
      );
    }

    testIdFromBatch.forEach((test) => {
      if (!testIdList.includes(Number(test))) {
        testIdWarn.push(test);
      }
    });

    batchIdFromStu.forEach((id) => {
      if (!batchIds.includes(id)) {
        batchIdWarn.push(id);
      }
    });

    for (let test in batchIdList) {
      if (!includedStudents[test]) {
        batchIdList[test]?.map((batch) => {
          emptyBatchIds.push(test + ":" + batch);
        });
      } else {
        const keys = Object.keys(includedStudents[test]);
        batchIdList[test].forEach((batch) => {
          if (!keys.includes(String(batch))) {
            emptyBatchIds.push(test + ":" + batch);
          }
        });
      }
    }

    const warn =
      testIdWarn.length > 0 ||
      batchIdWarn.length > 0 ||
      emptyBatchIds.length > 0;

    if (warn) {
      setter({
        testIds: {
          notSelected: testIdWarn,
          msg: "Selected Batch but not Test.",
        },
        bathcIds: {
          notSelected: batchIdWarn,
          msg: "is in studentIdList but not in batchIdList",
        },
        emptyBatchIds: {
          emptyBatchIds,
          msg: "no students not included in batches",
        },
      });
    } else {
      setter({});
    }

    if (warn) return 1;

    return 0;
  } catch (error) {
    return -1;
  }
};
