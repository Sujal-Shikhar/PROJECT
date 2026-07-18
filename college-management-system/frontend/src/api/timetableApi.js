import axios from "./axios";

/*
==========================================
GET ALL TIMETABLE
==========================================
*/

export const getTimetable = async (params = {}) => {
  const { data } = await axios.get("/timetable", {
    params,
  });

  return data;
};

/*
==========================================
GET TIMETABLE BY ID
==========================================
*/

export const getTimetableById = async (id) => {
  const { data } = await axios.get(
    `/timetable/${id}`
  );

  return data;
};

/*
==========================================
CREATE TIMETABLE
==========================================
*/

export const createTimetable = async (
  timetableData
) => {
  const { data } = await axios.post(
    "/timetable",
    timetableData
  );

  return data;
};

/*
==========================================
UPDATE TIMETABLE
==========================================
*/

export const updateTimetable = async (
  id,
  timetableData
) => {
  const { data } = await axios.put(
    `/timetable/${id}`,
    timetableData
  );

  return data;
};

/*
==========================================
DELETE TIMETABLE
==========================================
*/

export const deleteTimetable = async (id) => {
  const { data } = await axios.delete(
    `/timetable/${id}`
  );

  return data;
};

/*
==========================================
RESTORE TIMETABLE
==========================================
*/

export const restoreTimetable = async (
  id
) => {
  const { data } = await axios.put(
    `/timetable/restore/${id}`
  );

  return data;
};

/*
==========================================
SEARCH TIMETABLE
==========================================
*/

export const searchTimetable = async (
  keyword
) => {
  const { data } = await axios.get(
    "/timetable/search",
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
FACULTY TIMETABLE
==========================================
*/

export const getFacultyTimetable =
  async (facultyId) => {
    const { data } = await axios.get(
      `/timetable/faculty/${facultyId}`
    );

    return data;
  };

/*
==========================================
CLASS TIMETABLE
==========================================
*/

export const getClassTimetable =
  async (
    department,
    semester,
    section
  ) => {
    const { data } = await axios.get(
      `/timetable/class/${department}/${semester}/${section}`
    );

    return data;
  };

/*
==========================================
TODAY TIMETABLE
==========================================
*/

export const getTodayTimetable =
  async () => {
    const { data } = await axios.get(
      "/timetable/today"
    );

    return data;
  };

/*
==========================================
STATISTICS
==========================================
*/

export const getTimetableStats =
  async () => {
    const { data } = await axios.get(
      "/timetable/stats"
    );

    return data;
  };

/*
==========================================
DASHBOARD
==========================================
*/

export const getTimetableDashboard =
  async () => {
    const { data } = await axios.get(
      "/timetable/dashboard"
    );

    return data;
  };