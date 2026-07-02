import api from "./axios";

export const getStudents = async (params = {}) => {
  const { data } = await api.get("/students", {
    params,
  });

  return data;
};

export const getStudent = async (id) => {
  const { data } = await api.get(`/students/${id}`);
  return data;
};

export const createStudent = async (student) => {
  const { data } = await api.post("/students", student);
  return data;
};

export const updateStudent = async (id, student) => {
  const { data } = await api.put(`/students/${id}`, student);
  return data;
};

export const deleteStudent = async (id) => {
  const { data } = await api.delete(`/students/${id}`);
  return data;
};