import api from "./axios";

export const getFaculty = async (params = {}) => {
  const { data } = await api.get("/faculty", {
    params,
  });

  return data;
};

export const getFacultyById = async (id) => {
  const { data } = await api.get(`/faculty/${id}`);

  return data;
};

export const createFaculty = async (faculty) => {
  const formData = new FormData();

  Object.keys(faculty).forEach((key) => {
    if (faculty[key] !== undefined && faculty[key] !== null) {
      formData.append(key, faculty[key]);
    }
  });

  const { data } = await api.post(
    "/faculty",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const updateFaculty = async (
  id,
 faculty
) => {
  const formData = new FormData();

  Object.keys(faculty).forEach((key) => {
    if (faculty[key] !== undefined && faculty[key] !== null) {
      formData.append(key, faculty[key]);
    }
  });

  const { data } = await api.put(
    `/faculty/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const deleteFaculty = async (id) => {
  const { data } = await api.delete(`/faculty/${id}`);

  return data;
};