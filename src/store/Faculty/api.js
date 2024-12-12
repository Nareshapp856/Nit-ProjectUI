import axios from "axios";

import { FilterApiResponseServiceDataVersion } from "../Faculty/util/filterApiService";

const facultyURL = process.env.REACT_APP_FACULTY_API_URL;

export const facultyAPI = axios.create({ baseURL: facultyURL });

export const fc_facultyCurriculumListApi = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/getbasicdetails`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const ac_curriculumByIDApi = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/getcurriculamdetails`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export async function getModulesByFacultyId({ facultyId }) {
  try {
    const res = await facultyAPI.get(
      `api/facultycurriculam/getmodulesbyfacultyid/${facultyId}`
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export const fc_fetchSubTopics = async ({ topicId }) => {
  // eventhough i'm sending TopicID it contains SubTopicName For some last minute work done
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/getSubTopicIdIdByTopics`,
      { TopicID: topicId }
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

export const fc_fetchTopics = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/gettopicidbymodule`,
      payload
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

export async function addTopicAPI({ moduleId, topicName }) {
  try {
    const res = await facultyAPI.post(`api/facultycurriculam/addtopic`, {
      moduleId,
      topicName,
    });

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function addSubTopicAPI({ moduleId, topicId, subTopicName }) {
  try {
    const res = await facultyAPI.post(`/api/facultycurriculam/addSubTopic`, {
      moduleId,
      topicId,
      subTopicName,
    });

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export const mb_fetch_batches = async () => {
  try {
    const response = await facultyAPI.post(
      "api/facultycurriculam/getCourseBatchDetails"
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

export const mb_fetch_courseCurriculum = async (payload) => {
  try {
    const response = await facultyAPI.post(
      "api/facultycurriculam/gettCurriculumNameByfacultyid",
      { facultyId: payload }
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

export async function assignCurriculumToFaculty(payload) {
  try {
    const res = await axios.put(
      "http://49.207.10.13:4017/apinit/updateStudentCalenderSlots",
      payload
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchAssignedCurriculumAPI(payload) {
  let url = `/api/facultycurriculam/assignedCurriculum`;
  if (payload) url += `?id=${payload}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function updateAssignCurriculumToFacultyAPI(payload) {
  try {
    const res = await axios.put(
      `http://49.207.10.13:4004/apinit/updateAssessmentdetails`,
      payload
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchApprovedBatchListAPI(payload) {
  let url = `/api/facultycurriculam/approvedbatchlist`;
  if (payload && payload.userId) url += `?uid=${payload.userId}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchApprovedCurriculumListAPI(payload) {
  let url = `/api/facultycurriculam/fetchapprovedcurriculumlist`;
  if (payload && payload.userId) url += `?uid=${payload.userId}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function deleteAssignedCurriculumAPI(payload) {
  try {
    if (!payload) throw new Error("Must pass record details");

    const res = await facultyAPI.delete(
      `api/facultycurriculam/assignedCurriculum/${payload}`
    );

    return { status: res.status, data: res.data };
  } catch (error) {
    throw error;
  }
}

export async function fetchAssignedCurriculumListAPI(payload) {
  let url = `/api/facultycurriculam/assignedcurriculumList`;
  if (payload && payload.facultyId) url += `?uid=${payload.facultyId}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export const ac_fetchCurriculamDetails = async (curriculumId) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/getcoursedetailsbycurriculumid`,
      { curriculumId }
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

// Updated api
export const ac_updateFaculityCurriculum = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/admin_updateCourseStatus`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const ac_curriculumListApi = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/getfacultycurriculumdetails`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export async function deleteAssignedBatchByBatchAssignmentAPI(payload) {
  try {
    if (!payload.recordToDelete) throw new Error("Must pass record details");

    const res = await facultyAPI.delete(
      `api/facultycurriculam/assigned-batch-approval/${payload.recordToDelete}?uid=${payload.userId}`
    );

    return { status: res.status, data: res.data };
  } catch (error) {
    throw error;
  }
}

export async function fetchAdminAssignedBatchesAPI(type) {
  try {
    const res = await facultyAPI.get(
      `api/facultycurriculam/fetchAdminAssignedBatches?type=${type}`
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}
