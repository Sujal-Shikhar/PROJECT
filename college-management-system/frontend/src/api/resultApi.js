import axios from "./axios";

/*
==========================================
GET ALL RESULTS
==========================================
*/

export const getResults = async (params = {}) => {
  const { data } = await axios.get("/results", {
    params,
  });

  return data;
};

/*
==========================================
GET RESULT BY ID
==========================================
*/

export const getResultById = async (id) => {
  const { data } = await axios.get(
    `/results/${id}`
  );

  return data;
};

/*
==========================================
CREATE RESULT
==========================================
*/

export const createResult = async (
  resultData
) => {
  const { data } = await axios.post(
    "/results",
    resultData
  );

  return data;
};

/*
==========================================
UPDATE RESULT
==========================================
*/

export const updateResult = async (
  id,
  resultData
) => {
  const { data } = await axios.put(
    `/results/${id}`,
    resultData
  );

  return data;
};

/*
==========================================
DELETE RESULT
==========================================
*/

export const deleteResult = async (id) => {
  const { data } = await axios.delete(
    `/results/${id}`
  );

  return data;
};

/*
==========================================
RESTORE RESULT
==========================================
*/

export const restoreResult = async (id) => {
  const { data } = await axios.put(
    `/results/restore/${id}`
  );

  return data;
};

/*
==========================================
SEARCH RESULTS
==========================================
*/

export const searchResults = async (
  keyword
) => {
  const { data } = await axios.get(
    "/results/search",
    {
      params: {
        search: keyword,
      },
    }
  );

  return data;
};

/*
==========================================
PUBLISH RESULT
==========================================
*/

export const publishResult = async (
  id
) => {
  const { data } = await axios.put(
    `/results/publish/${id}`
  );

  return data;
};

/*
==========================================
UNPUBLISH RESULT
==========================================
*/

export const unpublishResult = async (
  id
) => {
  const { data } = await axios.put(
    `/results/unpublish/${id}`
  );

  return data;
};

/*
==========================================
LOCK RESULT
==========================================
*/

export const lockResult = async (id) => {
  const { data } = await axios.put(
    `/results/lock/${id}`
  );

  return data;
};

/*
==========================================
UNLOCK RESULT
==========================================
*/

export const unlockResult = async (
  id
) => {
  const { data } = await axios.put(
    `/results/unlock/${id}`
  );

  return data;
};

/*
==========================================
STUDENT RESULTS
==========================================
*/

export const getStudentResults =
  async (studentId) => {
    const { data } = await axios.get(
      `/results/student/${studentId}`
    );

    return data;
  };

/*
==========================================
SUBJECT RESULTS
==========================================
*/

export const getSubjectResults =
  async (subjectId) => {
    const { data } = await axios.get(
      `/results/subject/${subjectId}`
    );

    return data;
  };

/*
==========================================
EXAM RESULTS
==========================================
*/

export const getExamResults =
  async (examId) => {
    const { data } = await axios.get(
      `/results/exam/${examId}`
    );

    return data;
  };

/*
==========================================
SGPA
==========================================
*/

export const getSGPA = async (
  studentId,
  examId
) => {
  const { data } = await axios.get(
    `/results/student/${studentId}/sgpa/${examId}`
  );

  return data;
};

/*
==========================================
CGPA
==========================================
*/

export const getCGPA = async (
  studentId
) => {
  const { data } = await axios.get(
    `/results/student/${studentId}/cgpa`
  );

  return data;
};

/*
==========================================
RESULT STATISTICS
==========================================
*/

export const getResultStats =
  async () => {
    const { data } = await axios.get(
      "/results/stats"
    );

    return data;
  };

/*
==========================================
DASHBOARD SUMMARY
==========================================
*/

export const getDashboardSummary =
  async () => {
    const { data } = await axios.get(
      "/results/dashboard"
    );

    return data;
  };

/*
==========================================
EXPORT RESULTS
==========================================
*/

export const exportResults =
  async () => {
    const response = await axios.get(
      "/results/export",
      {
        responseType: "blob",
      }
    );

    return response.data;
  };

/*
==========================================
IMPORT RESULTS
==========================================
*/

export const importResults =
  async (results) => {
    const { data } = await axios.post(
      "/results/import",
      results
    );

    return data;
  };

/*
==========================================
DOWNLOAD STUDENT RESULT PDF
==========================================
*/

export const downloadStudentResultPDF = async (studentId) => {
  const response = await axios.get(
    `/results/pdf/student/${studentId}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};

/*
==========================================
DOWNLOAD SINGLE RESULT PDF
==========================================
*/

export const downloadResultPDF = async (resultId) => {
  const response = await axios.get(
    `/results/pdf/${resultId}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};