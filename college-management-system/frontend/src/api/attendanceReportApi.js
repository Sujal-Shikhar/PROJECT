import api from "./axios";

/*
=========================================
Overall Attendance Report
=========================================
*/

export const getAttendanceReport = async () => {
  const { data } = await api.get(
    "/attendance-report"
  );

  return data;
};

/*
=========================================
Student Attendance Report
=========================================
*/

export const getStudentReport = async (
  studentId
) => {
  const { data } = await api.get(
    `/attendance-report/student/${studentId}`
  );

  return data;
};

/*
=========================================
Subject Attendance Report
=========================================
*/

export const getSubjectReport = async (
  subjectId
) => {
  const { data } = await api.get(
    `/attendance-report/subject/${subjectId}`
  );

  return data;
};

/*
=========================================
Department Attendance Report
=========================================
*/

export const getDepartmentReport = async (
  department
) => {
  const { data } = await api.get(
    `/attendance-report/department/${department}`
  );

  return data;
};

/*
=========================================
Defaulters Report
=========================================
*/

export const getDefaulters = async () => {
  const { data } = await api.get(
    "/attendance-report/defaulters"
  );

  return data;
};

/*
=========================================
Monthly Attendance Report
=========================================
*/

export const getMonthlyReport = async () => {
  const { data } = await api.get(
    "/attendance-report/monthly"
  );

  return data;
};