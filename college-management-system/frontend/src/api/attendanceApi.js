import api from "./axios";

/*
==========================================
GET ALL ATTENDANCE
==========================================
*/

export const getAttendance = async (params = {}) => {
  const { data } = await api.get("/attendance", {
    params,
  });

  return data;
};

/*
==========================================
GET SINGLE ATTENDANCE
==========================================
*/

export const getAttendanceById = async (id) => {
  const { data } = await api.get(
    `/attendance/${id}`
  );

  return data;
};

/*
==========================================
CREATE ATTENDANCE
==========================================
*/

export const createAttendance = async (
  attendance
) => {
  const { data } = await api.post(
    "/attendance",
    attendance
  );

  return data;
};

/*
==========================================
UPDATE ATTENDANCE
==========================================
*/

export const updateAttendance = async (
  id,
  attendance
) => {
  const { data } = await api.put(
    `/attendance/${id}`,
    attendance
  );

  return data;
};

/*
==========================================
DELETE ATTENDANCE
==========================================
*/

export const deleteAttendance = async (
  id
) => {
  const { data } = await api.delete(
    `/attendance/${id}`
  );

  return data;
};

/*
==========================================
BULK ATTENDANCE
==========================================
*/

export const bulkAttendance = async (
  attendance
) => {
  const { data } = await api.post(
    "/attendance/bulk",
    {
      attendance,
    }
  );

  return data;
};

/*
==========================================
BULK DELETE
==========================================
*/

export const bulkDeleteAttendance =
  async (ids) => {
    const { data } =
      await api.delete(
        "/attendance/bulk-delete",
        {
          data: { ids },
        }
      );

    return data;
  };

/*
==========================================
STUDENT ATTENDANCE
==========================================
*/

export const getStudentAttendance =
  async (studentId) => {
    const { data } =
      await api.get(
        `/attendance/student/${studentId}`
      );

    return data;
  };

/*
==========================================
FACULTY ATTENDANCE
==========================================
*/

export const getFacultyAttendance =
  async (facultyId) => {
    const { data } =
      await api.get(
        `/attendance/faculty/${facultyId}`
      );

    return data;
  };

/*
==========================================
SUBJECT ATTENDANCE
==========================================
*/

export const getSubjectAttendance =
  async (subjectId) => {
    const { data } =
      await api.get(
        `/attendance/subject/${subjectId}`
      );

    return data;
  };

/*
==========================================
ATTENDANCE PERCENTAGE
==========================================
*/

export const getAttendancePercentage =
  async (studentId) => {
    const { data } =
      await api.get(
        `/attendance/percentage/${studentId}`
      );

    return data;
  };

/*
==========================================
LOW ATTENDANCE
==========================================
*/

export const getLowAttendance =
  async () => {
    const { data } =
      await api.get(
        "/attendance/reports/low-attendance"
      );

    return data;
  };

/*
==========================================
ATTENDANCE STATS
==========================================
*/

export const getAttendanceStats =
  async () => {
    const { data } =
      await api.get(
        "/attendance/stats"
      );

    return data;
  };

/*
==========================================
MONTHLY REPORT
==========================================
*/

export const getMonthlyAttendance =
  async () => {
    const { data } =
      await api.get(
        "/attendance/reports/monthly"
      );

    return data;
  };

/*
==========================================
DASHBOARD
==========================================
*/

export const getAttendanceDashboard =
  async () => {
    const { data } =
      await api.get(
        "/attendance/dashboard"
      );

    return data;
  };

/*
==========================================
EXPORT
==========================================
*/

export const exportAttendance =
  async () => {
    const { data } =
      await api.get(
        "/attendance/export"
      );

    return data;
  };