import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ExamDashboard from "../../components/exam/ExamDashboard";
import ExamFilters from "../../components/exam/ExamFilters";
import ExamTable from "../../components/exam/ExamTable";

import {
  getExams,
  deleteExam,
} from "../../api/examApi";

export default function ExamList() {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    semester: "",
    examType: "",
    status: "",
  });

  useEffect(() => {
    loadExams();
  }, [filters]);

  const loadExams = async () => {
    try {
      const data = await getExams(filters);
      setExams(data.exams || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load exams");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this exam?")) return;

    try {
      await deleteExam(id);
      toast.success("Exam deleted successfully");
      loadExams();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Exam Management
          </h1>

          <p className="text-gray-500">
            Manage all examinations
          </p>
        </div>

        <button
          onClick={() => navigate("/exams/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
        >
          + Add Exam
        </button>

      </div>

      <ExamDashboard />

      <ExamFilters
        filters={filters}
        setFilters={setFilters}
      />

      <ExamTable
        exams={exams}
        onDelete={remove}
      />

    </div>
  );
}