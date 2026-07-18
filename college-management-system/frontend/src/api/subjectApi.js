import api from "./axios";

export const getSubjects = (params) =>
  api.get("/subjects", { params }).then((res) => res.data);

export const getSubjectById = (id) =>
  api.get(`/subjects/${id}`).then((res) => res.data);

export const createSubject = (data) =>
  api.post("/subjects", data).then((res) => res.data);

export const updateSubject = (id, data) =>
  api.put(`/subjects/${id}`, data).then((res) => res.data);

export const deleteSubject = (id) =>
  api.delete(`/subjects/${id}`).then((res) => res.data);

export const restoreSubject = (id) =>
  api.put(`/subjects/${id}/restore`).then((res) => res.data);

export const assignFaculty = (id, facultyId) =>
  api
    .put(`/subjects/${id}/assign`, {
      facultyId,
    })
    .then((res) => res.data);

export const removeFaculty = (id) =>
  api
    .put(`/subjects/${id}/remove-faculty`)
    .then((res) => res.data);

export const getSubjectStats = () =>
  api
    .get("/subjects/stats")
    .then((res) => res.data);

export const exportSubjects = () =>
  api
    .get("/subjects/export")
    .then((res) => res.data);

export const importSubjects = (subjects) =>
  api
    .post("/subjects/import", subjects)
    .then((res) => res.data);

export const dashboardSummary = () =>
  api
    .get("/subjects/dashboard")
    .then((res) => res.data);