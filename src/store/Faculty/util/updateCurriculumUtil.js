import axios from "axios";

/**
 * Updates the curriculum data for a faculty member.
 *
 * @param {string} sessionName - courseCurriculam_Name.
 * @param {Array} tableData - facultyCourseMapping
 * @param {number} mappingId - The ID of the faculty course mapping.
 * @param {number} curriculumId - The ID of the curriculum.
 * @param {string} status - The status of the curriculum update.
 * @param {string} comment - The comment of the curriculum update.
 *
 * @returns {Promise<void>} A promise that resolves when the curriculum update is successful.
 *
 * @throws {Error} Throws an error if the API request fails.
 */
export const updateCurriculamUtil = async (
  userId,
  sessionName,
  tableData,
  mappingId,
  curriculumId,
  status,
  comment = ""
) => {
  try {
    const res = await axios.post(
      "http://49.207.10.13:6011/api/facultycurriculam/updatefacultycurriculum",
      {
        facultyId: userId,
        courseCurriculam_Name: sessionName,
        mappingId: mappingId,
        status: status,
        comments: comment,
        curriculam_Id: curriculumId,
        facultyCourseMapping: tableData.map((combo) => ({
          topicName:
            typeof combo.topics === "object"
              ? combo.topics?.join(", ") || ""
              : typeof combo.topicName === "object"
              ? combo.topicName?.join(", ") || ""
              : combo.topicName || "",
          subtopicName:
            typeof combo.subTopics === "object"
              ? combo.subTopics?.join(", ") || ""
              : typeof combo.subtopicName === "object"
              ? combo.subtopicName?.join(", ") || ""
              : combo.subtopicName || "",
          sessionId: combo.sessionNumber || combo.sessionId,
        })),
      }
    );

    return { data: res.data, status: res.status };
  } catch (err) {
    return { err: err, status: 500 };
  }
};
