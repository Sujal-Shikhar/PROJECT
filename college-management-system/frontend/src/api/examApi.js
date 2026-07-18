import axios from "./axios";

/*
==========================================
GET ALL EXAMS
==========================================
*/

export const getExams = async (params = {}) => {
  const { data } = await axios.get("/exams", {
    params,
  });

  return data;
};

/*
==========================================
GET EXAM BY ID
==========================================
*/

export const getExamById = async (id) => {
  const { data } = await axios.get(`/exams/${id}`);

  return data;
};

/*
==========================================
CREATE EXAM
==========================================
*/

export const createExam = async (examData) => {
  const { data } = await axios.post(
    "/exams",
    examData
  );

  return data;
};

/*
==========================================
UPDATE EXAM
==========================================
*/

export const updateExam = async (
  id,
  examData
) => {
  const { data } = await axios.put(
    `/exams/${id}`,
    examData
  );

  return data;
};

/*
==========================================
DELETE EXAM
==========================================
*/

export const deleteExam = async (id) => {
  const { data } = await axios.delete(
    `/exams/${id}`
  );

  return data;
};

/*
==========================================
RESTORE EXAM
==========================================
*/

export const restoreExam = async (id) => {
  const { data } = await axios.patch(
    `/exams/${id}/restore`
  );

  return data;
};

/*
==========================================
UPCOMING EXAMS
==========================================
*/

export const getUpcomingExams = async () => {
  const { data } = await axios.get(
    "/exams/upcoming"
  );

  return data;
};

/*
==========================================
COMPLETED EXAMS
==========================================
*/

export const getCompletedExams =
  async () => {
    const { data } = await axios.get(
      "/exams/completed"
    );

    return data;
  };

/*
==========================================
CANCEL EXAM
==========================================
*/

export const cancelExam = async (id) => {
  const { data } = await axios.patch(
    `/exams/${id}/cancel`
  );

  return data;
};

/*
==========================================
RESCHEDULE EXAM
==========================================
*/

export const rescheduleExam = async (
  id,
  examData
) => {
  const { data } = await axios.patch(
    `/exams/${id}/reschedule`,
    examData
  );

  return data;
};

/*
==========================================
STATISTICS
==========================================
*/

export const getExamStats = async () => {
  const { data } = await axios.get(
    "/exams/statistics"
  );

  return data;
};

/*
==========================================
DEPARTMENT EXAMS
==========================================
*/

export const getDepartmentExams =
  async (department) => {
    const { data } = await axios.get(
      `/exams/department/${department}`
    );

    return data;
  };

/*
==========================================
SEMESTER EXAMS
==========================================
*/

export const getSemesterExams =
  async (semester) => {
    const { data } = await axios.get(
      `/exams/semester/${semester}`
    );

    return data;
  };

/*
==========================================
CALENDAR
==========================================
*/

export const getExamCalendar =
  async () => {
    const { data } = await axios.get(
      "/exams/calendar"
    );

    return data;
  };

/*
==========================================
DASHBOARD
==========================================
*/

export const getExamDashboard =
  async () => {
    const { data } = await axios.get(
      "/exams/dashboard"
    );

    return data;
  };

/*
==========================================
EXPORT
==========================================
*/

export const exportExams = async () => {
  const { data } = await axios.get(
    "/exams/export"
  );

  return data;
};

/*
==========================================
IMPORT
==========================================
*/

export const importExams = async (exams) => {
  const { data } = await axios.post(
    "/exams/import",
    exams
  );

  return data;
};