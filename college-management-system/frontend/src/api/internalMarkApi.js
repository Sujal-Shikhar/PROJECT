import axios from "./axios";

/*
==========================================
GET ALL INTERNAL MARKS
==========================================
*/

export const getInternalMarks = async (params = {}) => {
  const { data } = await axios.get(
    "/internal-marks",
    { params }
  );

  return data;
};

/*
==========================================
GET INTERNAL MARK BY ID
==========================================
*/

export const getInternalMarkById = async (id) => {
  const { data } = await axios.get(
    `/internal-marks/${id}`
  );

  return data;
};

/*
==========================================
CREATE INTERNAL MARK
==========================================
*/

export const createInternalMark = async (
  markData
) => {
  const { data } = await axios.post(
    "/internal-marks",
    markData
  );

  return data;
};

/*
==========================================
UPDATE INTERNAL MARK
==========================================
*/

export const updateInternalMark = async (
  id,
  markData
) => {
  const { data } = await axios.put(
    `/internal-marks/${id}`,
    markData
  );

  return data;
};

/*
==========================================
DELETE INTERNAL MARK
==========================================
*/

export const deleteInternalMark = async (
  id
) => {
  const { data } = await axios.delete(
    `/internal-marks/${id}`
  );

  return data;
};

/*
==========================================
RESTORE INTERNAL MARK
==========================================
*/

export const restoreInternalMark = async (
  id
) => {
  const { data } = await axios.put(
    `/internal-marks/restore/${id}`
  );

  return data;
};

/*
==========================================
SEARCH INTERNAL MARKS
==========================================
*/

export const searchInternalMarks = async (
  keyword
) => {
  const { data } = await axios.get(
    "/internal-marks/search",
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
PUBLISH MARKS
==========================================
*/

export const publishMarks = async (
  id
) => {
  const { data } = await axios.put(
    `/internal-marks/publish/${id}`
  );

  return data;
};

/*
==========================================
UNPUBLISH MARKS
==========================================
*/

export const unpublishMarks = async (
  id
) => {
  const { data } = await axios.put(
    `/internal-marks/unpublish/${id}`
  );

  return data;
};

/*
==========================================
LOCK MARKS
==========================================
*/

export const lockMarks = async (id) => {
  const { data } = await axios.put(
    `/internal-marks/lock/${id}`
  );

  return data;
};

/*
==========================================
UNLOCK MARKS
==========================================
*/

export const unlockMarks = async (
  id
) => {
  const { data } = await axios.put(
    `/internal-marks/unlock/${id}`
  );

  return data;
};

/*
==========================================
STUDENT INTERNAL MARKS
==========================================
*/

export const getStudentInternalMarks =
  async (studentId) => {
    const { data } = await axios.get(
      `/internal-marks/student/${studentId}`
    );

    return data;
  };

/*
==========================================
SUBJECT INTERNAL MARKS
==========================================
*/

export const getSubjectInternalMarks =
  async (subjectId) => {
    const { data } = await axios.get(
      `/internal-marks/subject/${subjectId}`
    );

    return data;
  };

/*
==========================================
EXAM INTERNAL MARKS
==========================================
*/

export const getExamInternalMarks =
  async (examId) => {
    const { data } = await axios.get(
      `/internal-marks/exam/${examId}`
    );

    return data;
  };

/*
==========================================
STATISTICS
==========================================
*/

export const getInternalMarkStats =
  async () => {
    const { data } = await axios.get(
      "/internal-marks/stats"
    );

    return data;
  };

/*
==========================================
DASHBOARD
==========================================
*/

export const getDashboardSummary =
  async () => {
    const { data } = await axios.get(
      "/internal-marks/dashboard"
    );

    return data;
  };

/*
==========================================
EXPORT
==========================================
*/

export const exportInternalMarks =
  async () => {
    const { data } = await axios.get(
      "/internal-marks/export"
    );

    return data;
  };

/*
==========================================
IMPORT
==========================================
*/

export const importInternalMarks =
  async (records) => {
    const { data } = await axios.post(
      "/internal-marks/import",
      records
    );

    return data;
  };