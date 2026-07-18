import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import ExamForm from "../../components/exam/ExamForm";

import {
  getExamById,
  updateExam,
} from "../../api/examApi";

export default function EditExam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadExam();
  }, []);

  const loadExam = async () => {
    try {
      const data = await getExamById(id);
      setExam(data.exam);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load exam");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);

      await updateExam(id, formData);

      toast.success("Exam updated successfully");

      navigate("/exams");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!exam) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit Exam
        </h1>

        <p className="text-gray-500">
          Update exam details
        </p>
      </div>

      <ExamForm
        initialData={exam}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </div>
  );
}