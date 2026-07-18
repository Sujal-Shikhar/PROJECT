import api from "./axios";

export const getDashboardStats = async () => {
  const res = await api.get("/dashboard");

  return {
    totalStudents: res.data.counts.students,
    totalFaculty: res.data.counts.faculty,
    totalSubjects: res.data.counts.subjects,
    totalExams: res.data.counts.exams,
    totalAttendance: res.data.counts.attendance,
    totalPlacements: res.data.counts.placements,

    totalFeesCollected: res.data.fees.collected,
    totalPendingFees: res.data.fees.pending,

    recentStudents: res.data.recent.students,
    recentNotices: res.data.recent.notices,
  };
};