import api from "./axios";

/*
========================================
GET ALL ASSIGNMENTS
========================================
*/

export const getAssignments = async (
  params = {}
) => {
  const { data } = await api.get(
    "/faculty-subject",
    {
      params,
    }
  );

  return data;
};

/*
========================================
GET ASSIGNMENT BY ID
========================================
*/

export const getAssignmentById =
  async (id) => {
    const { data } = await api.get(
      `/faculty-subject/${id}`
    );

    return data;
  };

/*
========================================
CREATE ASSIGNMENT
========================================
*/

export const createAssignment =
  async (assignment) => {
    const { data } = await api.post(
      "/faculty-subject",
      assignment
    );

    return data;
  };

/*
========================================
UPDATE ASSIGNMENT
========================================
*/

export const updateAssignment =
  async (id, assignment) => {
    const { data } = await api.put(
      `/faculty-subject/${id}`,
      assignment
    );

    return data;
  };

/*
========================================
DELETE ASSIGNMENT
========================================
*/

export const deleteAssignment =
  async (id) => {
    const { data } =
      await api.delete(
        `/faculty-subject/${id}`
      );

    return data;
  };

/*
========================================
RESTORE ASSIGNMENT
========================================
*/

export const restoreAssignment =
  async (id) => {
    const { data } = await api.patch(
      `/faculty-subject/${id}/restore`
    );

    return data;
  };

/*
========================================
SEARCH ASSIGNMENTS
========================================
*/

export const searchAssignments =
  async (search) => {
    const { data } = await api.get(
      "/faculty-subject/search",
      {
        params: { search },
      }
    );

    return data;
  };

/*
========================================
FACULTY ASSIGNMENTS
========================================
*/

export const getFacultyAssignments =
  async (facultyId) => {
    const { data } = await api.get(
      `/faculty-subject/faculty/${facultyId}`
    );

    return data;
  };

/*
========================================
SUBJECT ASSIGNMENTS
========================================
*/

export const getSubjectAssignments =
  async (subjectId) => {
    const { data } = await api.get(
      `/faculty-subject/subject/${subjectId}`
    );

    return data;
  };

/*
========================================
DEPARTMENT ASSIGNMENTS
========================================
*/

export const getDepartmentAssignments =
  async (department) => {
    const { data } = await api.get(
      `/faculty-subject/department/${department}`
    );

    return data;
  };

/*
========================================
SEMESTER ASSIGNMENTS
========================================
*/

export const getSemesterAssignments =
  async (semester) => {
    const { data } = await api.get(
      `/faculty-subject/semester/${semester}`
    );

    return data;
  };

/*
========================================
STATISTICS
========================================
*/

export const getAssignmentStats =
  async () => {
    const { data } = await api.get(
      "/faculty-subject/stats"
    );

    return data;
  };

/*
========================================
FACULTY WORKLOAD
========================================
*/

export const getFacultyWorkload =
  async () => {
    const { data } = await api.get(
      "/faculty-subject/workload"
    );

    return data;
  };

/*
========================================
DASHBOARD SUMMARY
========================================
*/

export const getDashboardSummary =
  async () => {
    const { data } = await api.get(
      "/faculty-subject/dashboard"
    );

    return data;
  };

/*
========================================
EXPORT
========================================
*/

export const exportAssignments =
  async () => {
    const { data } = await api.get(
      "/faculty-subject/export"
    );

    return data;
  };

/*
========================================
IMPORT
========================================
*/

export const importAssignments =
  async (assignments) => {
    const { data } = await api.post(
      "/faculty-subject/import",
      assignments
    );

    return data;
  };