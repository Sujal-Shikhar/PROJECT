import axios from "./axios";

/*
==========================================
GET ALL PLACEMENTS
==========================================
*/

export const getPlacements = async (params = {}) => {
  const { data } = await axios.get("/placements", {
    params,
  });

  return data;
};

/*
==========================================
GET PLACEMENT BY ID
==========================================
*/

export const getPlacementById = async (id) => {
  const { data } = await axios.get(
    `/placements/${id}`
  );

  return data;
};

/*
==========================================
CREATE PLACEMENT
==========================================
*/

export const createPlacement = async (
  placementData
) => {
  const { data } = await axios.post(
    "/placements",
    placementData
  );

  return data;
};

/*
==========================================
UPDATE PLACEMENT
==========================================
*/

export const updatePlacement = async (
  id,
  placementData
) => {
  const { data } = await axios.put(
    `/placements/${id}`,
    placementData
  );

  return data;
};

/*
==========================================
DELETE PLACEMENT
==========================================
*/

export const deletePlacement = async (id) => {
  const { data } = await axios.delete(
    `/placements/${id}`
  );

  return data;
};

/*
==========================================
RESTORE PLACEMENT
==========================================
*/

export const restorePlacement = async (
  id
) => {
  const { data } = await axios.put(
    `/placements/restore/${id}`
  );

  return data;
};

/*
==========================================
SEARCH PLACEMENTS
==========================================
*/

export const searchPlacements = async (
  keyword
) => {
  const { data } = await axios.get(
    "/placements/search",
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
GET STUDENT PLACEMENTS
==========================================
*/

export const getStudentPlacements =
  async (studentId) => {
    const { data } = await axios.get(
      `/placements/student/${studentId}`
    );

    return data;
  };

/*
==========================================
GET COMPANY PLACEMENTS
==========================================
*/

export const getCompanyPlacements =
  async (company) => {
    const { data } = await axios.get(
      `/placements/company/${company}`
    );

    return data;
  };

/*
==========================================
GET SELECTED PLACEMENTS
==========================================
*/

export const getSelectedPlacements =
  async () => {
    const { data } = await axios.get(
      "/placements/selected"
    );

    return data;
  };

/*
==========================================
GET REJECTED PLACEMENTS
==========================================
*/

export const getRejectedPlacements =
  async () => {
    const { data } = await axios.get(
      "/placements/rejected"
    );

    return data;
  };

/*
==========================================
PLACEMENT STATISTICS
==========================================
*/

export const getPlacementStats =
  async () => {
    const { data } = await axios.get(
      "/placements/stats"
    );

    return data;
  };

/*
==========================================
DASHBOARD SUMMARY
==========================================
*/

export const getPlacementDashboard =
  async () => {
    const { data } = await axios.get(
      "/placements/dashboard"
    );

    return data;
  };