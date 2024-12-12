import axios from "axios";

const baseURL = process.env.REACT_APP_API_ADMIN;

const qdbURL = process.env.REACT_APP_API_QDB;

const api = axios.create({ baseURL });
const qdbAPI = axios.create({ baseURL: qdbURL });

export const deleteProgramApi = ({ programId }) => {
  try {
    const res = api.delete(`DeleteProgramquestionsBy_ProgramId/${programId}`);

    return res;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {technologyId}
 * @param {moduleId}
 * @param {topicId}
 * @param {subTopicId}
 */
export const fetchProgramsByTechnbologyApi = async ({
  technologyId,
  moduleId,
  topicId,
  subTopicId,
}) => {
  try {
    const res = await api.get(
      `FetchProgramsByTechnologies?TechnologyId=${
        technologyId || null
      }&moduleId=${moduleId || null}&TopicId=${topicId || null}&SubtopicId=${
        subTopicId || null
      }`
    );

    let filteredObj = { data: [], status: null };
    filteredObj.data = res.data;
    filteredObj.status = res.status;

    return filteredObj;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {programId}
 */
export const FetchTestcasesByProgramIDApi = async ({
  technologyId: TechnologyId,
  moduleId: ModuleId,
  topicId: TopicId,
  subTopicId: SubTopicId,
  programId: ProgramId,
}) => {
  try {
    const queryParams = [
      TechnologyId && `TechnologyId=${TechnologyId}`,
      ModuleId && `ModuleId=${ModuleId}`,
      TopicId && `TopicId=${TopicId}`,
      SubTopicId && `SubTopicId=${SubTopicId}`,
      ProgramId && `ProgramId=${ProgramId}`,
    ]
      .filter(Boolean)
      .join("&");

    const res = api.get(`FetchTestcasesByProgramID?${queryParams}`);

    return res;
  } catch (error) {
    return error;
  }
};

export const fetchTechnologiesApi = async () => {
  try {
    const res = await qdbAPI.get(`api/admin/fetch_technologies`);

    const filteredObj = {};

    filteredObj.data = res.data.data;
    filteredObj.status = res.status;

    return filteredObj;
  } catch (error) {
    return error;
  }
};

export const fetchModulesApi = async ({ technologyId }) => {
  try {
    if (!technologyId)
      throw new Error("Must pass technology data to get modules");
    const res = await qdbAPI.get(`api/admin/fetch_modules/${technologyId}`);

    const filteredObj = {};

    filteredObj.data = res.data.data;
    filteredObj.status = res.status;

    return filteredObj;
  } catch (error) {
    return error;
  }
};

export const fetchTopicsApi = async ({ moduleId }) => {
  try {
    if (!moduleId) throw new Error("Must pass module data to get topics");

    const res = await qdbAPI.get(`api/admin/fetch_topics/${moduleId}`);

    const filteredObj = {};

    filteredObj.data = res.data.data;
    filteredObj.status = res.status;

    return filteredObj;
  } catch (error) {
    return error;
  }
};

export const fetchSubTopicsApi = async ({ topicId }) => {
  try {
    if (!topicId) throw new Error("Must pass topic data to get subTopics");

    const res = await qdbAPI.get(`api/admin/fetch_subtopics/${topicId}`);

    const filteredObj = {};

    filteredObj.data = res.data.data;
    filteredObj.status = res.status;

    return filteredObj;
  } catch (error) {
    return error;
  }
};

export const fetchLanguagesApi = async () => {
  try {
    const res = await api.get("fetchProgramLanguages");

    const filteredObj = {};

    filteredObj.data = res.data;
    filteredObj.status = res.status;

    return filteredObj;
  } catch (error) {
    return error;
  }
};
export const addProgramApi = async ({
  programId,
  programName,
  programDescription,
  constraints,
  sampleInput,
  sampleOutput,
  explanation,
  languages,
  image,
  topicId,
  subTopicId,
  difficultyLevelId,
  technologyId,
  moduleId,
}) => {
  try {
    if (
      !programName ||
      !programDescription ||
      !sampleInput ||
      !sampleOutput ||
      !explanation ||
      !topicId ||
      !subTopicId ||
      !difficultyLevelId ||
      !technologyId ||
      !moduleId
    ) {
      throw new Error("Must pass valid data to add program");
    }

    // if (!(image || conaints)) {
    //   throw new Error("Must pass image or constraints to add program");
    // }

    if (!Array.isArray(languages) || languages.length === 0) {
      throw new Error("Must select at least one language to add program");
    }

    const filteredLanguages = languages
      .map((language) => language.Languages)
      .join(",");

    const res = await api.post("InsertUpdateDelete_ProgramsQuestions", {
      ProgramId: programId,
      ProgramName: programName,
      ProgramDescription: programDescription,
      Constraints: constraints,
      SampleInput: sampleInput,
      SampleOutput: sampleOutput,
      Explanation: explanation,
      Languages: filteredLanguages,
      Image: image,
      TopicId: topicId,
      SubtopicId: subTopicId,
      DifficultyLevelId: difficultyLevelId,
      TechnologyId: technologyId,
      ModuleId: moduleId,
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const addTestCasesApi = async ({
  testCaseName: TestCaseName,
  sampleInputValue: SampleInputValue,
  sampleOutputValue: SampleOutputValue,
  programId: ProgramId,
  testcaseId: TestCaseId,
}) => {
  try {
    if (
      !TestCaseName ||
      !SampleInputValue ||
      !SampleOutputValue ||
      !ProgramId
    ) {
      throw new Error("Must pass valid data to add testCase");
    }

    const res = api.post(`/InsertUpdate_ProgramTestCases`, {
      TestCaseName,
      SampleInputValue,
      SampleOutputValue,
      ProgramId,
      TestCaseId,
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteTestCasesApi = async ({ testCaseId }) => {
  try {
    if (!testCaseId) {
      throw new Error("Must pass testCaseId to delete a testCase");
    }

    const res = api.delete(`Delete_ProgramTestCases`, {
      data: { TestcaseId: testCaseId },
    });

    return res;
  } catch (error) {
    return error;
  }
};
