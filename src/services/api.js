import axios from "axios";
import { FilterApiResponseServiceDataVersion } from "./FilterApiService";

export const baseURL = process.env.REACT_APP_ADMIN_API_URL;
export const registerURL = process.env.REACT_APP_API_URL;
export const authUrl = process.env.REACT_APP_AUTH_API;
const facultyURL = process.env.REACT_APP_FACULTY_API_URL;
const api = axios.create({ baseURL });

export const apiregister = axios.create({ baseURL: registerURL });
export const facultyAPI = axios.create({ baseURL: facultyURL });
export const authAPI = axios.create({ baseURL: authUrl });

export default api;

export async function getBatchDetails(props) {
  try {
    const batchId = props;

    if (!batchId) {
      throw new Error("must pass batchId to fetch batch details.");
    }

    const response = await api.get(`/retrive-batch-details/${batchId}`);

    return response;
  } catch (error) {
    return error;
    // const notFound = { message: "page not found" };

    // if (error.response.status >= 400 && error.response.status < 500) {
    // }

    // if (error.response.status === 500) {
    // }
  }
}

export async function deleteEnrollItem(payload) {
  try {
    const res = api.delete("/DeleteEnrollmentId", {
      data: { EnrollmentId: payload },
    });

    return res;
  } catch (error) {
    return {};
  }
}

export async function fetchTechnologiesAPI(payload) {
  try {
    const res = await apiregister.get(`apinit/fetchTechnologies`, payload);

    return { data: res.data, status: res.status };
  } catch (error) {
    throw error;
  }
}

export async function registerInterviewerAPI(payload) {
  console.log(payload);
  try {
    const res = await authAPI.post(
      `api/interviewer/registerUser`,
      payload
    );
    console.log(res);

    return FilterApiResponseServiceDataVersion(res, {
      dataExtractor: (res) => {
        return res?.data?.message || "";
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function submitEvolutionSheetAPI(payload) {
  try {
    const res = await facultyAPI.post(
      `api/interviewer/insert-evolutionsheet`,
      payload
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}
